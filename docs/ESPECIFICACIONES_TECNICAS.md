# Especificaciones técnicas — Chiltu v1.0

Documento de referencia para arquitectos de software, evaluadores técnicos y auditores. Describe en detalle la arquitectura interna, dependencias, modelo de datos y decisiones de diseño del programa.

---

## 1. Arquitectura general

Chiltu es una **aplicación web estática de página única** (*static single-page application*) que ejecuta enteramente del lado del cliente. No requiere servidor de aplicaciones, base de datos, autenticación, ni cualquier servicio backend en tiempo de ejecución.

### 1.1 Diagrama lógico

```
┌─────────────────────────────────────────────────────────────┐
│                    Navegador del usuario                     │
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │  index.html  │ → │  CSS tokens  │ → │  CSS layout  │    │
│  │  (semantic)  │   │  (variables) │   │  (presentación)│  │
│  └──────────────┘   └──────────────┘   └──────────────┘    │
│         │                                                    │
│         ↓                                                    │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Capa de datos (data.js)              │       │
│  │   POINTS · SPECIES · BASINS · ABUNDANCE · etc.   │       │
│  └──────────────────────────────────────────────────┘       │
│         │                                                    │
│         ├──→ filters.js (Observable FilterState)             │
│         ├──→ map.js (SVG + proyección + tooltips)            │
│         ├──→ charts.js (Chart.js wrapper)                    │
│         ├──→ export.js (serializers CSV / GeoJSON)           │
│         └──→ main.js (bootstrap + theme)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │           Recursos externos (vía CDN)             │       │
│  │   Chart.js 4.4.1 · Fraunces · DM Sans · JetBrains │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Flujo de inicialización

1. El navegador carga `index.html`.
2. Se cargan en cascada `tokens.css` y `main.css` (presentación).
3. Se cargan secuencialmente los módulos JavaScript en orden de dependencia:
   `data.js` → `filters.js` → `map.js` → `export.js` → Chart.js (CDN) → `charts.js` → `main.js`.
4. El evento `DOMContentLoaded` dispara `bootstrap()` en `main.js`.
5. `bootstrap()` inicializa secuencialmente:
   - Tema (Theme.init)
   - Filtros (initFilters)
   - Mapa (MapView.init)
   - Exportadores (initExport)
   - Gráficos (Charts.init) cuando Chart.js esté disponible.

---

## 2. Modelo de datos

### 2.1 Estructura de un punto de muestreo

Cada punto es un array de cinco elementos para optimizar el tamaño del archivo:

```javascript
[latitud, longitud, altitud_msnm, codigo_cuenca, codigo_especie]
```

| Índice | Tipo | Descripción |
|--------|------|-------------|
| `[0]` | Float | Latitud en grados decimales (WGS84, negativo en hemisferio sur) |
| `[1]` | Float | Longitud en grados decimales (WGS84, negativo al oeste) |
| `[2]` | Integer | Altitud en metros sobre el nivel del mar |
| `[3]` | String | Código de cuenca: `'r'`, `'ch'`, `'l'` |
| `[4]` | String | Código de especie: `'c'`, `'h'`, `'p'`, `'n'` |

### 2.2 Diccionarios de referencia

#### SPECIES — propiedades por especie

Cada entrada de `SPECIES[code]` contiene 16 atributos: nombre científico, autoridad taxonómica, grupo filogenético, relación con el tomate domesticado, hábito, altitud, terreno, indumento, hojas, flores, fruto, resistoma, conteo de individuos, porcentaje, color principal, color suave, color profundo.

#### BASINS — propiedades por cuenca

Cada entrada de `BASINS[code]` contiene metadata (puntos, individuos, especies), 10 índices ecológicos (taxa, dominance, simpson, shannon, evenness, margalef, menhinick, fisher, bergerParker, chao1), una nota interpretativa y los colores asociados.

### 2.3 Bounding box geográfico

```javascript
MAP_BOUNDS = {
  latMin: -12.20, latMax: -11.38,
  lngMin: -76.90, lngMax: -76.27
}
```

Cobertura: aproximadamente 91 km de norte a sur y 69 km de este a oeste.

---

## 3. Módulo de visualización cartográfica

### 3.1 Proyección

Se utiliza una **proyección equirectangular** (también conocida como *plate carrée*). Esta elección se justifica por:

1. La extensión espacial reducida del área de estudio (~80 × 90 km).
2. La latitud baja (entre 11°S y 12°S) donde la distorsión de áreas es mínima.
3. La simplicidad del cálculo, sin requerir bibliotecas geoespaciales complejas.

### 3.2 Renderizado SVG

El mapa se renderiza inline como SVG (`<svg viewBox="0 0 800 540">`). Componentes:

- **Capa de cuadrícula** — patrón CSS de líneas de 40 × 40 px como referencia visual.
- **Capa de ríos** — tres `<path>` con curvas de Bézier cuadráticas y cúbicas, aproximando la orientación general de cada cuenca.
- **Capa de orientación** — escala, compás norte, etiquetas direccionales.
- **Capa de puntos** — 88 `<circle>` con `cx`, `cy` calculados por la función `project()`, color por especie y opacidad según el estado del filtro.

### 3.3 Interacción

Cada punto del mapa dispara los eventos:
- `mouseenter` y `focus` → mostrar tooltip
- `mouseleave` y `blur` → ocultar tooltip

Los puntos son focalizables por teclado (`tabindex="0"`) y poseen `role="button"` con `aria-label` descriptivo.

---

## 4. Módulo de filtros

Implementación de patrón **Observer** clásico. El objeto `FilterState` mantiene dos conjuntos (`Set`) de valores activos y una lista de suscriptores.

### 4.1 API pública

```javascript
FilterState.toggle(group, value)         // Conmutar un valor
FilterState.reset()                      // Restablecer todo activo
FilterState.subscribe(fn)                // Suscribir callback
FilterState.filterPoints(points)         // Devuelve array filtrado
FilterState.isVisible(point)             // Boolean para un punto
```

### 4.2 Restricción funcional

El método `toggle` impide desactivar todos los valores de un grupo simultáneamente. Si se intenta desactivar el último, la operación se ignora silenciosamente.

---

## 5. Módulo de gráficos

Wrapper sobre Chart.js 4.4.1 que estandariza la tematización, las fuentes y los colores en función del tema activo.

### 5.1 Gráficos implementados

| ID | Tipo | Fuente de datos | Propósito |
|----|------|-----------------|-----------|
| `chart-abundance` | Bar (vertical, agrupado) | Tabla 7 del informe | Abundancia por especie y cuenca |
| `chart-altitude` | Bar (horizontal, apilado) | Tabla 3 del informe | Distribución por piso altitudinal |
| `chart-indices` | Bar (vertical, agrupado) | Tabla 1 del informe | Comparación de índices ecológicos |

### 5.2 Tematización

El método `Charts.palette()` detecta el tema activo (`data-theme="light"` o `"dark"`) y devuelve un objeto de color adecuado. Al cambiar el tema, `Theme.set()` destruye y reinicializa todos los gráficos.

---

## 6. Módulo de exportación

Implementa dos serializadores conformes a estándares abiertos.

### 6.1 CSV

Conforme a RFC 4180. Codificación UTF-8. Separador coma. Sin entrecomillado salvo en campos que lo requieran. Encabezado de columnas como primera fila. Líneas comentadas (precedidas por `#`) con metadatos del proyecto al inicio del archivo.

### 6.2 GeoJSON

Conforme a RFC 7946. Codificación UTF-8. Estructura `FeatureCollection` con array de `Feature` de tipo `Point`. Coordenadas en orden `[longitude, latitude, altitude]` conforme al estándar. Bloque adicional `metadata` con información del proyecto (extensión no estándar pero conservativa).

### 6.3 Generación del archivo

Ambos formatos se generan mediante `URL.createObjectURL(blob)` y se disparan con un elemento `<a>` con atributo `download`. No se requiere conexión a servidor.

---

## 7. Módulo de tema

### 7.1 Persistencia

La preferencia de tema se almacena en `localStorage` bajo la clave `'solanum-atlas-theme'`. En primera carga sin preferencia almacenada, se respeta `prefers-color-scheme` del sistema operativo.

### 7.2 Implementación

Se modifica el atributo `data-theme` del elemento `<html>`. Todas las variables CSS bajo `:root[data-theme="dark"]` son redefinidas, propagándose automáticamente a toda la presentación.

---

## 8. Dependencias externas

### 8.1 Bibliotecas

| Biblioteca | Versión | Licencia | Uso |
|------------|---------|----------|-----|
| Chart.js | 4.4.1 | MIT | Renderizado de gráficos canvas |

### 8.2 Fuentes tipográficas

Todas distribuidas bajo SIL Open Font License vía Google Fonts:

- **Fraunces** — Display serif variable (200–900, opsz 9–144)
- **DM Sans** — Cuerpo sans-serif (300, 400, 500, 600)
- **JetBrains Mono** — Monoespaciada para datos y código (400, 500)

### 8.3 Comportamiento offline

Tras la primera carga con conexión, las fuentes y la biblioteca Chart.js quedan en la caché del navegador. La aplicación funciona sin conexión en visitas posteriores.

---

## 9. Compatibilidad y rendimiento

### 9.1 Soporte de navegadores

| Navegador | Versión mínima | Notas |
|-----------|----------------|-------|
| Chrome / Chromium | 90 | Soporte completo |
| Firefox | 88 | Soporte completo |
| Safari | 14 | Soporte completo |
| Edge | 90 | Soporte completo |
| Internet Explorer | — | No soportado |

### 9.2 Características modernas utilizadas

- ES6+ (arrow functions, `Set`, `const`/`let`, template literals)
- CSS Custom Properties
- CSS Grid y Flexbox
- `<dialog>` no se usa por consistencia de soporte
- `localStorage` para persistencia de tema
- Blob API + URL.createObjectURL para descargas

### 9.3 Rendimiento

- Tamaño total del programa (sin contar Chart.js ni fuentes externas): **menos de 50 KB sin minificar**.
- Tiempo de carga inicial estimado en conexión banda ancha: <1 segundo.
- 88 puntos en el mapa: render instantáneo (sin throttling).
- Cambio de filtro: respuesta <50 ms.

---

## 10. Accesibilidad

El programa cumple los siguientes lineamientos de WCAG 2.1 nivel AA:

- Estructura semántica HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`, `<nav>`).
- Atributos ARIA en componentes interactivos (`role="button"`, `aria-pressed`, `aria-label`, `aria-hidden`, `aria-labelledby`).
- Etiquetas alternativas descriptivas en gráficos canvas y SVG.
- Navegación completa por teclado (`tabindex` en puntos del mapa).
- Contraste de color verificado en ambos temas (claro y oscuro).
- Tipografía escalable mediante unidades `rem`.
- Texto alternativo en iconos decorativos (`aria-hidden="true"`).
- Sin uso obligatorio de ratón para ninguna funcionalidad.

---

## 11. Pruebas

### 11.1 Pruebas funcionales realizadas

| Caso de prueba | Resultado |
|----------------|-----------|
| Carga inicial sin errores en consola | ✓ |
| Renderizado de 88 puntos | ✓ |
| Activación/desactivación de filtros por especie | ✓ |
| Activación/desactivación de filtros por cuenca | ✓ |
| Restricción de no permitir todos desactivados | ✓ |
| Tooltip al hover sobre punto | ✓ |
| Tooltip al focus por teclado | ✓ |
| Generación de CSV con filtros activos | ✓ |
| Generación de GeoJSON con filtros activos | ✓ |
| Cambio de tema claro / oscuro | ✓ |
| Persistencia del tema entre sesiones | ✓ |
| Reinicialización de gráficos al cambiar tema | ✓ |
| Responsividad en anchos desde 320 px | ✓ |
| Apertura directa con `file://` | ✓ |

### 11.2 Pruebas de compatibilidad

Probado en: Chrome 120 (macOS y Windows), Firefox 121 (Linux), Safari 17 (macOS).

---

## 12. Limitaciones conocidas

1. La proyección equirectangular introduce una mínima distorsión angular que no afecta la lectura general pero no debe usarse para mediciones de precisión submétricas.
2. La aplicación es un visualizador, no un editor: no permite modificar el dataset embebido. Cualquier corrección debe realizarse editando `js/data.js` directamente.
3. La biblioteca Chart.js se carga vía CDN. En entornos completamente aislados sin posibilidad de caché previa, debe descargarse y referenciarse localmente.
4. La aplicación está localizada únicamente al idioma español. Una versión multilingüe está prevista para futuras versiones.

---

## 13. Líneas de desarrollo futuras

Aspectos identificados para versiones posteriores (sin compromiso):

- v1.1 — Capa adicional de áreas naturales protegidas (ANP) sobre el mapa.
- v1.2 — Integración con datos climáticos de SENAMHI por punto.
- v1.3 — Modo "clave dicotómica interactiva" para identificación asistida.
- v2.0 — Pipeline de morfometría digital (renombrado: MorfoSolanum).
- v3.0 — Análisis filogeográfico con redes haplotípicas (renombrado: FilogeoSolanum).

---

*Documento controlado · Versión 1.0 · Diciembre 2025*
