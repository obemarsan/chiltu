# Manual de usuario — Chiltu v1.0.0

## Atlas de tomate silvestre del Perú — Versión piloto sobre cuencas Rímac, Chillón y Lurín

---

## 1. Presentación

**Chiltu** es una aplicación web autocontenida diseñada para visualizar, analizar y exportar los datos del proyecto *"Evaluación de la diversidad genética del tomate silvestre (Solanum spp.) en las cuencas de los ríos Lurín, Rímac y Chillón, Lima, Perú"* (RCU 125-2024-UNTELS-CU), ejecutado por el grupo BIOPROSGEN de la Universidad Nacional Tecnológica de Lima Sur bajo permiso del Servicio Nacional Forestal y de Fauna Silvestre (SERFOR) otorgado mediante Resolución Directoral RD D000148-2025-MIDAGRI-SERFOR-DGGSPFFS-DGSPF (código de autorización AUT-IFL-2025-076).

La aplicación permite al usuario explorar la distribución geográfica de 88 unidades muestrales, identificar las cuatro especies de *Solanum* sect. *Lycopersicon* registradas en el área de estudio, comparar índices ecológicos entre cuencas y exportar los datos en formatos compatibles con sistemas de información geográfica.

El nombre **RCL** refiere a las tres cuencas hidrográficas evaluadas: **R**ímac, **C**hillón y **L**urín.

---

## 2. Requisitos del sistema

Chiltu es una aplicación de página única (SPA) ejecutable en cualquier navegador web moderno sin necesidad de instalación, servidor o base de datos.

### 2.1 Requisitos mínimos

| Componente | Especificación |
|------------|----------------|
| Sistema operativo | Windows 10+, macOS 10.13+, Linux con entorno gráfico |
| Navegador | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Resolución de pantalla | 1024 × 768 px (recomendado 1366 × 768 o superior) |
| Memoria RAM | 2 GB |
| Espacio en disco | 5 MB |
| Conexión a internet | Solo necesaria la primera vez para cargar fuentes y la biblioteca de gráficos |

### 2.2 Compatibilidad probada

| Navegador | Versión mínima |
|-----------|----------------|
| Google Chrome | 90 |
| Mozilla Firefox | 88 |
| Apple Safari | 14 |
| Microsoft Edge | 90 |

La aplicación es responsiva: funciona en pantallas táctiles (tablets y teléfonos en orientación horizontal).

---

## 3. Instalación y ejecución

### 3.1 Modo simple — apertura directa

1. Descomprima el archivo `chiltu.zip` en una carpeta de su preferencia.
2. Abra la carpeta `chiltu/`.
3. Haga doble clic sobre el archivo `index.html`.
4. La aplicación se abrirá en su navegador predeterminado.

### 3.2 Modo servidor local — recomendado para desarrollo

Si requiere las mejores prestaciones (por ejemplo, evitar restricciones de CORS al cargar recursos), ejecute un servidor HTTP local:

```bash
# Opción 1: Python 3 (incluido en macOS y Linux)
cd chiltu
python3 -m http.server 8000

# Opción 2: Node.js
npx serve chiltu

# Opción 3: PHP
php -S localhost:8000 -t chiltu
```

Luego acceda en su navegador a `http://localhost:8000`.

### 3.3 Modo offline

Una vez cargada la aplicación por primera vez con conexión a internet, las fuentes tipográficas y la biblioteca de gráficos quedarán en la caché del navegador. La aplicación funcionará sin conexión en visitas posteriores.

---

## 4. Interfaz general

La aplicación está estructurada en una sola página vertical con seis secciones principales, navegables mediante desplazamiento:

1. **Cabecera fija** — marca, manual y conmutador de tema (claro / oscuro).
2. **Encabezado del proyecto** — título, descripción y metadatos institucionales.
3. **Resumen estadístico** — cuatro métricas clave: puntos georreferenciados, número de especies, total de individuos contados, rango altitudinal.
4. **Cartografía** — mapa interactivo con filtros, exportación CSV y GeoJSON.
5. **Galería taxonómica** — fichas detalladas de las cuatro especies.
6. **Análisis ecológico** — comparativa de cuencas y tres gráficos analíticos.
7. **Clave de identificación rápida** — tabla resumen.
8. **Pie de página** — citación APA 7 y metadatos institucionales.

---

## 5. Uso de la cartografía interactiva

### 5.1 Lectura del mapa

El mapa utiliza una proyección equirectangular sobre el bounding box geográfico de las tres cuencas (aproximadamente 11°24′ S a 12°09′ S y 76°17′ O a 76°52′ O, datum WGS84). Cada círculo coloreado representa una unidad muestral del Anexo 1 del informe final.

Los tres ríos aparecen como trazos curvos esquemáticos que orientan la lectura: el Chillón al norte, el Rímac al centro y el Lurín al sur. Una escala aproximada de 10 km y un compás norte se muestran en la esquina inferior derecha.

### 5.2 Codificación de colores

Las cuatro especies se distinguen por color:

| Color | Especie | Total de individuos |
|-------|---------|--------------------:|
| Verde botánico (#3B6D11) | *S. corneliomulleri* | 575 |
| Ámbar mostaza (#BA7517) | *S. habrochaites* | 114 |
| Rojo tomate (#A32D2D) | *S. pimpinellifolium* | 87 |
| Violeta seco (#6B5B95) | *S. pennellii* | 20 |

### 5.3 Filtros

Sobre el mapa se ubican dos grupos de chips de filtrado:

- **Por especie** — botones con la abreviatura del nombre científico.
- **Por cuenca** — botones con el nombre de cada río.

Para activar o desactivar un filtro, haga clic sobre el chip correspondiente. Los puntos no seleccionados se atenúan al 6% de opacidad pero permanecen visibles como referencia. La aplicación impide desactivar todos los filtros simultáneamente para mantener siempre al menos un grupo visible.

### 5.4 Inspección de puntos

Al pasar el cursor sobre un punto del mapa, se despliega un tooltip con la siguiente información:

- Nombre científico de la especie.
- Autoridad taxonómica.
- Grupo filogenético.
- Cuenca hidrográfica.
- Altitud en metros sobre el nivel del mar.
- Coordenadas geográficas (latitud y longitud en grados decimales, WGS84).

Los puntos también son navegables por teclado (Tab para enfocar, Enter para activar el tooltip). Cada punto tiene un atributo `aria-label` descriptivo para lectores de pantalla.

### 5.5 Exportación de datos

Bajo el mapa se encuentran dos botones de exportación. Ambos respetan los filtros activos: solo se exportan los puntos visibles.

#### CSV

Genera un archivo `solanum_atlas_rcl.csv` con las siguientes columnas:

```
punto_id, latitud_decimal, longitud_decimal, altitud_msnm,
cuenca, especie, especie_codigo, grupo_filogenetico
```

El archivo incluye un encabezado con metadatos del proyecto en líneas comentadas (precedidas por `#`). Es directamente importable a Microsoft Excel, LibreOffice Calc, R, Python (pandas) y otros sistemas.

#### GeoJSON

Genera un archivo `solanum_atlas_rcl.geojson` conforme a RFC 7946. Cada punto es un objeto `Feature` con geometría `Point` (coordenadas en orden longitud, latitud, altitud) y propiedades taxonómicas y ecológicas. Incluye un objeto `metadata` con información del proyecto. Es directamente cargable en QGIS, ArcGIS, geopandas, Mapbox y Leaflet.

---

## 6. Galería taxonómica

Cada una de las cuatro especies dispone de una tarjeta con los siguientes campos, todos extraídos de la Tabla 2 del informe final:

- **Nombre científico** y autoridad taxonómica.
- **Grupo filogenético** y relación con el tomate domesticado (*S. lycopersicum*).
- **Hábito de crecimiento** con rango de cobertura.
- **Altitud** preferente.
- **Terreno** característico.
- **Indumento** (pubescencia, tricomas).
- **Flores** y morfología de anteras.
- **Fruto** (forma, color, pubescencia).
- **Resistoma destacado** — síntesis del análisis bioinformático de transcriptomas de resistencia abiótica (Sección 6.5 del informe).

En el ángulo superior derecho de cada tarjeta se muestra el número absoluto de individuos contados y el porcentaje respecto al total general (796 individuos).

---

## 7. Análisis ecológico

### 7.1 Comparativa de cuencas

Tres tarjetas comparativas muestran, para cada cuenca, los siguientes índices calculados a partir del conteo de individuos:

| Índice | Significado |
|--------|-------------|
| Shannon (H') | Diversidad de Shannon-Wiener — combina riqueza y equidad |
| Simpson (1-D) | Probabilidad de que dos individuos al azar sean de especies distintas |
| Dominancia | Concentración de individuos en pocas especies |
| Margalef | Riqueza ajustada por tamaño de muestra |
| Equidad J | Uniformidad en la distribución de abundancia |
| Berger-Parker | Proporción de la especie más abundante |

Adicionalmente, una nota interpretativa por cuenca contextualiza los valores.

### 7.2 Gráfico de abundancia

Gráfico de barras agrupadas mostrando el conteo de individuos de cada especie en cada cuenca (Tabla 7 del informe).

### 7.3 Gráfico de distribución altitudinal

Gráfico de barras horizontales apiladas mostrando cómo se distribuyen las cuatro especies en los tres pisos altitudinales (2800–3500, 1800–2799 y 550–1799 m s.n.m.) dentro de cada cuenca (Tabla 3 del informe).

### 7.4 Gráfico de índices comparados

Gráfico de barras agrupadas comparando los cuatro índices principales (Shannon, Simpson, Margalef, Equidad J) entre las tres cuencas.

---

## 8. Tema visual

La aplicación dispone de dos temas:

- **Claro** — papel cálido sobre tinta profunda, evocando monografías taxonómicas clásicas.
- **Oscuro** — adaptado para uso prolongado en entornos de baja luz; los colores de las especies se ajustan automáticamente para mantener contraste accesible.

El conmutador se encuentra en el extremo derecho de la cabecera fija. La preferencia se almacena en `localStorage` y persiste entre sesiones.

---

## 9. Atajos y accesibilidad

| Acción | Atajo |
|--------|-------|
| Navegar por puntos del mapa | Tab |
| Mostrar tooltip del punto enfocado | Enter o Space |
| Conmutar filtro | Click o Enter sobre el chip |
| Cambiar tema | Click sobre el icono solar/lunar |

Cumple los siguientes lineamientos de accesibilidad:

- Roles ARIA (`role="button"`, `aria-label`, `aria-pressed`) en filtros, puntos del mapa y controles.
- Etiquetas `<label>` y texto alternativo descriptivo en gráficos (`aria-label`) para lectores de pantalla.
- Estructura semántica HTML5 con `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Contraste de color verificado para todos los pares texto/fondo.
- Navegación completa por teclado sin uso obligatorio del ratón.

---

## 10. Citación

Si utiliza datos o capturas obtenidas desde Chiltu en publicaciones académicas, congresos o documentos institucionales, por favor cite:

> Vertiz Osores, J., Marín Sánchez, O., Vilchez Ochoa, G., Rafael Rutte, R., Rendon Schneir, E., & Daga López, R. (2025). *Evaluación de la diversidad genética del tomate silvestre (Solanum spp.) en las cuencas de los ríos Lurín, Rímac y Chillón, Lima, Perú*. Informe final de proyecto financiado RCU 125-2024-UNTELS-CU. Grupo de Investigación en Bioprospección en Salud Ambiental y Metagenómica (BIOPROSGEN), Universidad Nacional Tecnológica de Lima Sur (UNTELS), Villa El Salvador.

Para el software:

> Marín Sánchez, O. (2025). *Chiltu: Visualizador científico de diversidad de tomate silvestre en las cuencas Rímac, Chillón y Lurín* [Software, versión 1.0]. Universidad Nacional Tecnológica de Lima Sur.

---

## 11. Soporte y contacto

Para reportes técnicos, sugerencias de mejora o consultas científicas sobre el contenido, contactar al autor del software a través del Grupo de Investigación en Bioprospección en Salud Ambiental y Metagenómica (BIOPROSGEN), Universidad Nacional Tecnológica de Lima Sur (UNTELS).

---

## 12. Glosario abreviado

- **Anteras porales** — anteras que liberan polen por poros apicales, no por dehiscencia longitudinal.
- **Indumento** — cobertura pilosa de la superficie vegetal.
- **ITS** — *Internal Transcribed Spacer*, regiones de ADN ribosomal usadas como marcadores genéticos.
- **Resistoma** — conjunto de genes asociados a respuesta de resistencia frente a un factor de estrés.
- **Simpodio** — patrón de ramificación característico de Solanaceae.
- **Tricoma glandular** — proyección epidérmica con función secretora.
- **WGS84** — *World Geodetic System 1984*, datum geodésico de referencia mundial.

---

*Documento controlado · Versión 1.0 · Diciembre 2025*
