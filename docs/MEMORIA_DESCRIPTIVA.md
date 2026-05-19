# Memoria descriptiva del programa de ordenador

## Chiltu — Atlas digital de diversidad de tomate silvestre (*Solanum* spp.) del Perú

**Documento preparado para registro ante el Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual (INDECOPI) — Dirección de Derecho de Autor.**

---

## I. Datos generales del programa

| Campo | Valor |
|-------|-------|
| Título del programa | Chiltu |
| Subtítulo descriptivo | Atlas de tomate silvestre del Perú · versión piloto sobre las cuencas Rímac, Chillón y Lurín |
| Versión | 1.0.0 |
| Fecha de creación | Mayo 2026 |
| País de creación | República del Perú |
| Naturaleza | Software de visualización científica de datos geoespaciales y ecológicos |
| Idioma de la interfaz | Español |
| Carácter de la obra | Originaria, en co-autoría |
| Estado de divulgación | Inédito al momento del depósito |
| Fines comerciales | No (uso académico, docente y de divulgación) |
| Etimología del nombre | "Chiltu" — tomate en lengua quechua (quechua cuzqueño). Honra el origen andino de las especies silvestres del género *Solanum* sect. *Lycopersicon*, de las cuales 14 de las 17 especies conocidas crecen en territorio peruano. |

---

## II. Datos de los co-autores

El programa Chiltu es una **obra en co-autoría** desarrollada por tres investigadores miembros del grupo BIOPROSGEN de la Universidad Nacional Tecnológica de Lima Sur, cada uno con un aporte autoral diferenciado y necesario para la existencia de la obra en su forma actual.

### II.1 Co-autor 1 — Obert Marín Sánchez

| Campo | Valor |
|-------|-------|
| Nombre completo | Obert Marín Sánchez |
| Grado académico | Ph.D.(c) en Biotecnología |
| Filiación institucional | Universidad Nacional Tecnológica de Lima Sur (UNTELS) · Universidad Nacional Mayor de San Marcos (UNMSM) |
| Grupo de investigación | BIOPROSGEN — Bioprospección en Salud y Metagenómica Ambiental |
| Registro CONCYTEC | RENACYT P0005113, Nivel IV |
| Identificador ORCID | 0000-0003-2912-1191 |
| DNI | [a completar antes de firmar] |
| **Aporte autoral** | Arquitectura técnica del software · programación íntegra del código fuente (HTML, CSS, JavaScript) · diseño de la visualización cartográfica e implementación de la proyección equirectangular · lógica de filtros reactivos · serializadores de exportación CSV y GeoJSON · sistema de tematización · diseño visual general · redacción de la documentación técnica (memoria descriptiva, manual de usuario, especificaciones técnicas, trazabilidad de datos) |

### II.2 Co-autor 2 — Rubén Armando Daga López

| Campo | Valor |
|-------|-------|
| Nombre completo | Rubén Armando Daga López |
| Grado académico | MSc. |
| Filiación institucional | Universidad Nacional Tecnológica de Lima Sur (UNTELS) |
| Grupo de investigación | BIOPROSGEN — Bioprospección en Salud y Metagenómica Ambiental |
| Rol en el proyecto base | Co-investigador del proyecto RCU 125-2024-UNTELS-CU |
| DNI | [a completar antes de firmar] |
| **Aporte autoral** | Curaduría científica del dataset de 88 puntos georreferenciados · validación cruzada de coordenadas, altitudes, asignaciones de cuenca y de especie · generación del archivo XLSX canónico con metadatos enriquecidos (fechas de muestreo, coordenadas UTM 18L Este/Norte, numeración secuencial de puntos) que constituye una de las piezas documentales del software (depositada como `docs/Especies_Monitoreadas_validado_RDaga.xlsx`) · garantía de integridad científica del contenido visualizado |

### II.3 Co-autor 3 — Jacinto Joaquín Vertiz Osores

| Campo | Valor |
|-------|-------|
| Nombre completo | Jacinto Joaquín Vertiz Osores |
| Grado académico | Dr. |
| Filiación institucional | Universidad Nacional Tecnológica de Lima Sur (UNTELS) |
| Grupo de investigación | BIOPROSGEN — Bioprospección en Salud y Metagenómica Ambiental |
| Rol en el proyecto base | Investigador responsable del proyecto RCU 125-2024-UNTELS-CU |
| DNI | [a completar antes de firmar] |
| **Aporte autoral** | Elaboración y firma del informe final del proyecto base, fuente primaria de todo el contenido científico visualizado por el software · revisión científica del contenido visualizado (caracterización morfo-anatómica de las cuatro especies, índices ecológicos por cuenca, distribución altitudinal, análisis de abundancia, síntesis de resistomas) · provisión de las fechas de muestreo de los puntos 61-88 (Anexo 2 del informe) que completan el dataset embebido en el software · marco interpretativo de la diversidad de *Solanum* en las tres cuencas hidrográficas |

### II.4 Justificación de la co-autoría

La co-autoría declarada en la presente memoria se sustenta en aportes diferenciados, complementarios e indispensables. El software no existiría en su forma actual sin la concurrencia de los tres aportes: la programación del código (sin la cual no hay software), la validación científica del dataset (sin la cual no hay contenido confiable) y la elaboración del marco científico interpretativo (sin el cual no hay caracterización ni contexto ecológico significativo). Los tres co-autores son miembros del grupo BIOPROSGEN y co-firmantes del proyecto de investigación base que da origen a los datos.

---

## III. Datos de la titularidad

Los **derechos patrimoniales** del programa corresponden conjuntamente a los tres co-autores (Obert Marín Sánchez, Rubén Armando Daga López y Jacinto Joaquín Vertiz Osores), en partes iguales, salvo acuerdo escrito en contrario suscrito posteriormente entre las partes.

Adicionalmente, la **Universidad Nacional Tecnológica de Lima Sur (UNTELS)** podrá figurar como **co-productora** del programa en su calidad de institución que financió y coordinó el proyecto base RCU 125-2024-UNTELS-CU que dio origen al dataset y al marco científico visualizado por el software, conforme a lo que disponga el reglamento de propiedad intelectual vigente de la Universidad y los acuerdos institucionales correspondientes. Esta co-producción no afecta la titularidad patrimonial de los tres co-autores, salvo pacto institucional posterior debidamente documentado.

Los **derechos morales** (paternidad, integridad, divulgación) corresponden de forma intransferible a cada uno de los co-autores sobre sus respectivos aportes a la obra.

---

## IV. Resumen ejecutivo

Chiltu es un programa de ordenador desarrollado como aplicación web autocontenida (página única, *single-page application*) cuya finalidad es la visualización interactiva, el análisis comparativo y la exportación estructurada de los datos derivados del proyecto de investigación *"Evaluación de la diversidad genética del tomate silvestre (Solanum spp.) en las cuencas de los ríos Lurín, Rímac y Chillón, Lima, Perú"* (RCU 125-2024-UNTELS-CU), ejecutado por el grupo BIOPROSGEN de la UNTELS bajo permiso del Servicio Nacional Forestal y de Fauna Silvestre (SERFOR) número AUT-IFL-2025-076 (Resolución Directoral D000148-2025-MIDAGRI-SERFOR-DGGSPFFS-DGSPF).

El programa permite al usuario:

1. Explorar la distribución geográfica de 88 unidades muestrales georreferenciadas sobre un mapa interactivo de proyección equirectangular.
2. Filtrar dinámicamente los registros por especie taxonómica y por cuenca hidrográfica.
3. Consultar la caracterización morfo-anatómica de las cuatro especies registradas de *Solanum* sect. *Lycopersicon*.
4. Comparar índices de diversidad biológica entre las tres cuencas mediante gráficos estadísticos.
5. Exportar los datos en formatos abiertos compatibles con sistemas de información geográfica.

El programa constituye una herramienta original de divulgación científica y de soporte a la docencia universitaria en disciplinas como ecología, biotecnología, agronomía y conservación de recursos genéticos.

---

## V. Descripción técnica

### 5.1 Arquitectura general

El programa adopta una arquitectura de aplicación web estática de página única, sin dependencia de servidor de aplicaciones, base de datos relacional ni servicios externos en tiempo de ejecución. Toda la lógica reside en el lado del cliente (navegador del usuario final). Los datos científicos se encuentran embebidos en un módulo JavaScript autocontenido.

Esta arquitectura tiene como ventaja la portabilidad absoluta del programa, su capacidad de operar sin conexión a internet una vez cargado, y la facilidad de su distribución y verificación de integridad (todo el código fuente se incluye en una única estructura de archivos sin compilación previa).

### 5.2 Lenguajes y tecnologías empleadas

| Capa | Lenguaje / tecnología | Versión / norma |
|------|----------------------|-----------------|
| Marcado estructural | HTML5 | Especificación WHATWG / W3C |
| Presentación visual | CSS3 con propiedades personalizadas | Especificación W3C nivel 3+ |
| Lógica de aplicación | JavaScript (ECMAScript 2015+) | ES6+ |
| Visualización gráfica | SVG inline (cartografía) y Canvas (gráficos) | W3C SVG 1.1 / HTML5 Canvas |
| Biblioteca de gráficos | Chart.js | 4.4.1 (UMD, MIT license, **incluida localmente en `vendor/`**) |
| Tipografía | Fraunces, DM Sans, JetBrains Mono | Vía Google Fonts (SIL OFL) con fallback a fuentes del sistema |
| Formato de datos | JSON, CSV, GeoJSON (RFC 7946) | Estándares abiertos |

### 5.3 Estructura del código fuente

El programa se organiza en los siguientes módulos:

```
chiltu/
├── index.html              ─ Punto de entrada, estructura semántica
├── css/
│   ├── tokens.css          ─ Variables de diseño (paleta, tipografía)
│   └── main.css            ─ Estilos de presentación y layout
├── js/
│   ├── data.js             ─ Dataset embebido (88 puntos, especies, índices)
│   ├── filters.js          ─ Gestión del estado de filtros
│   ├── map.js              ─ Renderizado del mapa SVG y proyección
│   ├── charts.js           ─ Configuración de gráficos analíticos
│   ├── export.js           ─ Exportación CSV y GeoJSON
│   └── main.js             ─ Orquestación e inicialización
├── vendor/
│   └── chart.umd.min.js    ─ Biblioteca Chart.js 4.4.1 incluida localmente
├── assets/
│   └── favicon.svg         ─ Icono de la aplicación
└── docs/
    ├── MANUAL_USUARIO.md
    ├── MEMORIA_DESCRIPTIVA.md
    ├── ESPECIFICACIONES_TECNICAS.md
    └── DATOS_FUENTE.md
```

### 5.4 Algoritmos y componentes funcionales

El programa implementa los siguientes algoritmos originales del autor:

#### 5.4.1 Proyección cartográfica equirectangular

Implementación de proyección lineal lat/lng → coordenadas SVG, calibrada sobre el bounding box geográfico del estudio. La función `MapView.project(lat, lng)` calcula coordenadas planas adecuadas para la extensión espacial del área evaluada (~80 × 90 km), donde una proyección más compleja sería innecesaria.

```javascript
project(lat, lng) {
  const { latMin, latMax, lngMin, lngMax } = MAP_BOUNDS;
  const padding = 40;
  const innerW = this.width - 2 * padding;
  const innerH = this.height - 2 * padding;
  const x = padding + ((lng - lngMin) / (lngMax - lngMin)) * innerW;
  const y = padding + ((latMax - lat) / (latMax - latMin)) * innerH;
  return [x, y];
}
```

#### 5.4.2 Gestión reactiva del estado de filtros

Patrón observador para sincronizar los filtros con todas las vistas dependientes. El objeto `FilterState` mantiene conjuntos (`Set`) de especies y cuencas seleccionadas, y notifica a los suscriptores ante cualquier cambio.

#### 5.4.3 Serializadores de exportación

Algoritmos para transformar el dataset filtrado a formatos CSV (con encabezado de metadatos en comentarios) y GeoJSON (con bloque `metadata` no estándar pero compatible).

#### 5.4.4 Sistema de tematización dinámica

Implementación de cambio de tema (claro / oscuro) mediante variables CSS y persistencia en `localStorage`. Los gráficos Chart.js se reinicializan al cambiar el tema para sincronizar la paleta de visualización.

### 5.5 Interfaz de usuario

La interfaz se compone de las siguientes regiones funcionales:

1. **Cabecera persistente** — Marca, acceso al manual, conmutador de tema.
2. **Encabezado del proyecto** — Título y metadatos institucionales.
3. **Panel de métricas resumen** — Cuatro indicadores clave del muestreo.
4. **Cartografía interactiva** — Mapa SVG con filtros, tooltips y exportación.
5. **Galería taxonómica** — Cuatro tarjetas detalladas de las especies.
6. **Análisis ecológico** — Tarjetas comparativas de cuencas y tres gráficos.
7. **Tabla de identificación rápida** — Síntesis de caracteres diagnósticos.
8. **Pie de página** — Citación, metadatos institucionales y licencia.

La interfaz es totalmente responsiva (se adapta a anchos desde 320 px hasta resoluciones de escritorio amplias) y cumple lineamientos de accesibilidad WCAG 2.1 nivel AA (roles ARIA, navegación por teclado, contraste suficiente, etiquetas descriptivas para lectores de pantalla).

### 5.6 Fuente y volumen de datos

El programa procesa y visualiza los siguientes datos primarios, todos provenientes del informe final del proyecto base:

- **88 puntos de muestreo** georreferenciados (Anexo 1 del informe), con coordenadas WGS84 en grados decimales, altitud en metros sobre el nivel del mar, cuenca hidrográfica y especie identificada.
- **4 especies** de *Solanum* sect. *Lycopersicon* con caracterización morfo-anatómica completa (Tabla 2 del informe).
- **Índices de diversidad biológica** calculados para cada cuenca: Shannon, Simpson, Margalef, Menhinick, Fisher alpha, Berger-Parker, Chao-1, Brillouin, Equitability y Evenness (Tabla 1 del informe).
- **Distribución cuantitativa** por piso altitudinal (Tabla 3) y por cuenca (Tabla 7).
- **Síntesis del análisis de resistomas** (Sección 6.5 del informe).

---

## VI. Casos de uso previstos

El programa fue concebido para los siguientes contextos de aplicación:

1. **Docencia universitaria** — Material didáctico en cursos de ecología, biotecnología, biología molecular, agronomía y conservación. Específicamente, en el Diplomado en Inmunología Molecular y Celular y la Maestría en Biotecnología y Gestión Ambiental ofrecidos por la UNMSM y la UNTELS.

2. **Divulgación científica** — Comunicación accesible de los resultados del proyecto a audiencias amplias: estudiantes, formuladores de políticas públicas, organizaciones de conservación, comunidades agrícolas.

3. **Soporte a la investigación** — Herramienta de consulta rápida para investigadores que requieren ubicar poblaciones silvestres en futuras campañas de muestreo, hibridación o estudios genéticos.

4. **Insumo para gestión territorial** — Información geográfica explícita para los funcionarios del MINAM, MIDAGRI, SERFOR, ANA y autoridades locales involucradas en la gestión de las cuencas Rímac, Chillón y Lurín.

5. **Repositorio digital de respaldo** — Documentación digital interactiva del proyecto, complementaria al informe en formato PDF.

---

## VII. Originalidad y aportes

El programa constituye una creación original del autor en los siguientes aspectos:

1. **Síntesis y reorganización de datos científicos primarios** en una arquitectura de visualización novedosa, no derivada de plataformas preexistentes.

2. **Algoritmos propios** de proyección cartográfica calibrada, gestión reactiva de filtros, serialización a CSV con metadatos y serialización a GeoJSON con bloque institucional.

3. **Diseño visual original** que evoca la tradición de las monografías taxonómicas botánicas, mediante una paleta de tonos tierra, tipografía serif refinada y composición editorial controlada, diferenciándose deliberadamente de plantillas genéricas de visualización de datos.

4. **Documentación técnica integral** (este documento, manual de usuario y especificaciones técnicas) elaborada para garantizar la reproducibilidad y la transferencia del programa.

El programa no incorpora código fuente de terceros con excepción de la biblioteca Chart.js, distribuida bajo licencia MIT (compatible con el uso académico no comercial declarado para este programa) y las fuentes tipográficas distribuidas bajo SIL Open Font License.

---

## VIII. Material complementario depositado

Adjunto a esta memoria descriptiva, se deposita:

1. **Código fuente íntegro** del programa, en estructura de archivos sin compilar.
2. **Manual de usuario** detallado.
3. **Especificaciones técnicas** complementarias.
4. **Referencia a fuentes de datos** primarios del proyecto base.
5. **Archivo README.md** con instrucciones de instalación y ejecución.
6. **Términos de uso** del programa.

---

## IX. Declaración

Los abajo firmantes declaran, bajo juramento, que:

1. Son los co-autores del programa de ordenador descrito en la presente memoria, con los aportes diferenciados detallados en la Sección II.
2. El programa es una creación original y no infringe derechos de propiedad intelectual de terceros.
3. El uso de bibliotecas de terceros se efectúa conforme a sus respectivas licencias, compatibles con la naturaleza académica y no comercial del presente programa.
4. Los datos científicos visualizados provienen del proyecto base RCU 125-2024-UNTELS-CU, ejecutado bajo permiso SERFOR AUT-IFL-2025-076, dirigido por el Dr. Jacinto Joaquín Vertiz Osores como investigador responsable y con la participación activa de los tres co-firmantes como miembros del grupo BIOPROSGEN.
5. La titularidad de los derechos patrimoniales sobre el software corresponde a los tres co-firmantes en partes iguales.
6. El Sr. Obert Marín Sánchez queda facultado para tramitar el registro de la obra ante la Dirección de Derecho de Autor del INDECOPI, en representación de los tres co-autores.
7. La presente declaración se hace para los fines del registro de la obra ante INDECOPI.

---

**Lugar y fecha**: Lima, _____ de _____________ de 2026

### Firmas de los co-autores

<br>

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Obert Marín Sánchez** · Ph.D.(c)
DNI: _______________

<br>

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Rubén Armando Daga López** · MSc.
DNI: _______________

<br>

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Jacinto Joaquín Vertiz Osores** · Dr.
DNI: _______________

---

*Documento controlado · Memoria descriptiva v1.0.0 · Mayo 2026*
