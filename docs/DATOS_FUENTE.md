# Trazabilidad de datos fuente — Chiltu

Este documento establece la correspondencia entre los datos visualizados por el programa y sus fuentes primarias en el informe final del proyecto base.

---

## 1. Proyecto base

**Título completo**: *Evaluación de la diversidad genética del tomate silvestre (Solanum spp.) en las cuencas de los ríos Lurín, Rímac y Chillón, Lima, Perú*

**Resolución de aprobación**: RCU 125-2024-UNTELS-CU (10 de julio de 2024)

**Permiso de colecta**: SERFOR AUT-IFL-2025-076 — Resolución Directoral D000148-2025-MIDAGRI-SERFOR-DGGSPFFS-DGSPF (7 de agosto de 2025)

**Grupo ejecutor**: Bioprospección en Salud y Metagenómica Ambiental (BIOPROSGEN) — Universidad Nacional Tecnológica de Lima Sur.

**Investigador responsable**: Dr. Jacinto Joaquín Vertiz Osores.

**Co-investigadores**:
- MSc. Obert Marín Sánchez
- Dr. Guillermo Lorenzo Vilchez Ochoa
- Dr. Robert Richard Rafael Rutte
- Dr. Eric Rendon Schneir
- MSc. Rubén Armando Daga López

**Período de ejecución**: 2024–2025.

**Documento fuente**: Informe Final firmado digitalmente con fecha 30 de diciembre de 2025.

---

## 2. Correspondencia de datos

### 2.1 Puntos de muestreo georreferenciados

| Componente en Chiltu | Fuente en el informe |
|--------------------------------|---------------------|
| Array `POINTS` en `js/data.js` (88 entradas) | Anexo 1 — "Puntos de muestreo del estudio" (páginas 44–46) |
| Coordenadas WGS84 (latitud, longitud) | Anexo 1, columnas Latitud y Longitud |
| Altitud en m s.n.m. | Anexo 1, columna Elevación |
| Cuenca hidrográfica | Anexo 1, columna Cuenca |
| Especie identificada | Anexo 1, columna Especie |
| Coordenadas UTM 18L (Este, Norte) | Anexo 1, columnas Este y Norte |
| Fecha de muestreo (puntos 1-60) | XLSX `Especies_Monitoreadas_validado_RDaga.xlsx`, validado por MSc. Rubén Daga López (mayo 2026) |
| Fecha de muestreo (puntos 61-88, Chillón octubre) | Anexo 2 del informe — campañas del 20 y 21 de octubre de 2025 |

### 2.1.1 Validación cruzada por co-investigador

El archivo `docs/Especies_Monitoreadas_validado_RDaga.xlsx` contiene la versión depurada de los 88 puntos georreferenciados, confirmada por el co-investigador MSc. Rubén Armando Daga López en mayo de 2026. Esta validación cruzada se utilizó para:

1. **Confirmar la integridad de coordenadas, altitud, cuenca y asignación de especie** en los 88 puntos. La comparación elemento a elemento entre el XLSX validado y el dataset embebido en `js/data.js` arrojó cero discrepancias.
2. **Aportar metadatos complementarios** no presentes en el cuerpo principal del informe: fechas de muestreo individualizadas, coordenadas UTM 18L (Este, Norte) y número de identificación secuencial (Nro) de cada punto.
3. **Reforzar la trazabilidad** del registro ante INDECOPI, mediante una pieza de validación independiente y posterior al informe firmado, generada por un miembro del equipo BIOPROSGEN distinto del investigador responsable.

El XLSX presenta vacíos en la columna Fecha para los puntos 61-88 (campañas de octubre en Chillón); estos vacíos se completaron con la información del Anexo 2 del informe final firmado por Vertiz Osores el 30 de diciembre de 2025, manteniendo plena trazabilidad documental de cada valor.

### 2.2 Caracterización taxonómica

| Atributo de las tarjetas de especies | Fuente |
|--------------------------------------|--------|
| Nombre científico, autoridad | Sección 6.2 del informe |
| Grupo filogenético, relación con domesticado | Tabla 2, columna "Grupo filogenético/Relación con el tomate domesticado" |
| Hábito de crecimiento | Tabla 2, columna "Hábito de crecimiento" |
| Altitud y tipo de terreno | Tabla 2, columna "Altitud/Tipo de terreno" |
| Indumento | Tabla 2, columna "Indumento" |
| Hojas por simpodio | Tabla 2, columna "Hojas por simpodio" |
| Flores y anteras | Tabla 2, columna "Flores/Anteras" |
| Características del fruto | Tabla 2, columna "Frutos" |

### 2.3 Índices ecológicos por cuenca

| Índice mostrado en la aplicación | Fuente |
|----------------------------------|--------|
| Taxa (S), Individuos | Tabla 1 |
| Dominance (D), Simpson (1-D), Shannon (H') | Tabla 1 |
| Evenness (e^H/S), Brillouin, Equitability (J) | Tabla 1 |
| Menhinick, Margalef, Fisher alpha | Tabla 1 |
| Berger-Parker, Chao-1 | Tabla 1 |

### 2.4 Distribución cuantitativa

| Componente | Fuente |
|------------|--------|
| Conteo por piso altitudinal en gráfico de altitud | Tabla 3 — "Detalle cuantitativo por tres pisos altitudinales" |
| Conteo de individuos por cuenca y especie en gráfico de abundancia | Tabla 7 — "Detalle cuantitativo de las cuatro especies por cuenca" |
| Total de 796 individuos en métricas resumen | Tabla 7, total |
| Porcentajes por especie | Tabla 7, columna porcentaje del total |

### 2.5 Resistomas

| Componente | Fuente |
|------------|--------|
| Descripción del resistoma de cada especie en tarjeta taxonómica | Sección 6.5 del informe — "Comparación de patrones genéticos de transcriptomas" |
| Información sobre S. corneliomulleri y MYB (~3095 genes) | Figura 18 y sección 6.5.5 |
| Información sobre S. pennellii y tolerancia a salinidad (DREB, NAC) | Sección 6.5.6 y Figura 19 |

### 2.6 Notas interpretativas por cuenca

Las notas que acompañan a cada tarjeta de cuenca son síntesis interpretativas redactadas a partir de las secciones VI y VII del informe (Resultados y Discusiones), específicamente los subtítulos 6.1.2 ("Análisis ecológico de la biodiversidad y abundancia"), Figuras 4, 5, 6 y Discusiones generales.

---

## 3. Notas sobre el manejo de los datos

### 3.1 Puntos con coordenadas coincidentes

El Anexo 1 del informe presenta algunos pares de puntos con coordenadas idénticas (por ejemplo, puntos 19 y 20, 24 y 25, etc.). Esto refleja registros independientes de dos especies coexistentes en el mismo lugar de muestreo. En el dataset embebido del programa, ambos registros se preservan como entradas separadas, manteniendo la fidelidad al documento fuente.

### 3.2 Punto fuera de rango altitudinal declarado

El punto 66 (cuenca Chillón) figura en el Anexo 1 con altitud 3694 m s.n.m., ligeramente por encima del rango declarado en la sección metodológica (3500 m s.n.m. como límite superior previsto). Se preserva el dato tal como aparece en el documento fuente.

### 3.3 Resultados genéticos no representados

El programa no representa los resultados de identificación genética por ITS (Sección 6.4.2 del informe) porque dicha técnica resultó no concluyente al 100% según concluye el propio informe (Sección VIII, conclusión 8.2). La identificación de especies en el dataset se basa en el reconocimiento taxonómico *in situ* y la corroboración del Herbario UNPRG, conforme a la conclusión 8.2 del informe.

---

## 4. Integridad de los datos

Los datos primarios del proyecto reposan en:

1. **Informe Final del Proyecto** firmado digitalmente con fecha 30 de diciembre de 2025 (sello FIRMA DIGITAL del Dr. Jacinto Joaquín Vertiz Osores).
2. **Archivo XLSX `Especies_Monitoreadas.xlsx`** validado por el co-investigador MSc. Rubén Armando Daga López en mayo de 2026, depositado como evidencia adicional en `docs/Especies_Monitoreadas_validado_RDaga.xlsx`.
3. **Archivos de campo originales** custodiados por el grupo BIOPROSGEN.
4. **Muestras herborizadas** depositadas en el Herbario de la Universidad Nacional Pedro Ruiz Gallo (UNPRG), Institución Científica Nacional Depositaria de Material Biológico (ICNDMB), conforme al artículo 4 del permiso SERFOR.

La transcripción de los 88 puntos al dataset embebido `js/data.js` fue realizada manualmente desde el Anexo 1 del informe y posteriormente verificada por comparación elemento a elemento contra el XLSX validado por Rubén Daga López. No se modificó ningún valor de coordenada, altitud, cuenca o asignación específica.

---

## 5. Acuerdo institucional

El uso de los datos primarios del proyecto RCU 125-2024-UNTELS-CU para la elaboración del presente software fue conversado con el equipo de investigación BIOPROSGEN. El software constituye una obra derivada de visualización, separada del informe original, cuya autoría corresponde individualmente a Obert Marín Sánchez con co-titularidad institucional UNTELS.

---

*Documento controlado · Versión 1.0 · Diciembre 2025*
