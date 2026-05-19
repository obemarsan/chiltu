# Historial de versiones — Chiltu

Formato según [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) · Versionado según [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.0.0] — 2026-05-19

### Versión inaugural

Primer lanzamiento público de **Chiltu**: atlas digital de diversidad de tomate silvestre (*Solanum* spp., sección *Lycopersicon*) del Perú, en su versión piloto sobre las cuencas Rímac, Chillón y Lurín del departamento de Lima.

#### Co-autoría inaugural

- **Obert Marín Sánchez** (MSc. · UNTELS-UNMSM · BIOPROSGEN) — arquitectura técnica, programación íntegra del código, diseño visual, documentación.
- **Rubén Armando Daga López** (Mg. · UNTELS · BIOPROSGEN) — curaduría científica del dataset, validación cruzada de coordenadas y asignaciones, generación del XLSX canónico con metadatos enriquecidos.
- **Jacinto Joaquín Vertiz Osores** (Dr. · UNTELS · BIOPROSGEN) — elaboración del informe final del proyecto base, revisión científica del contenido visualizado, marco interpretativo de la diversidad ecológica.

#### Funcionalidad

- Cartografía interactiva con 88 puntos georreferenciados (Anexo 1 del informe RCU 125-2024-UNTELS-CU).
- Proyección equirectangular WGS84 calibrada al bounding box del estudio.
- Filtros dinámicos por especie taxonómica y por cuenca hidrográfica.
- Tooltips con datos taxonómicos, altitudinales, fecha de muestreo y coordenadas UTM 18L.
- Galería taxonómica con caracterización morfo-anatómica completa de las cuatro especies.
- Comparativa de cuencas con 10 índices ecológicos (Shannon, Simpson, Margalef, Berger-Parker, Equidad J, Brillouin, Menhinick, Fisher, Chao-1, Dominancia).
- Tres gráficos analíticos: abundancia por cuenca, distribución altitudinal, índices comparados.
- Tabla de identificación rápida con caracteres diagnósticos.
- Exportación CSV (RFC 4180) y GeoJSON (RFC 7946) con metadatos.
- Bloque de citación con tres formatos copiables (APA 7, Vancouver, BibTeX).
- Tema claro / oscuro con persistencia.
- Diseño responsivo y accesible (WCAG 2.1 AA).
- Operación 100% offline tras la primera carga.

#### Identidad visual y editorial

- Rebranding desde "SolanumAtlas RCL" a **Chiltu** (del quechua cuzqueño, "tomate").
- Rediseño visual académico moderno, tono Nature/Cell contemporáneo.
- Tipografía Inter (sans), Source Serif 4 (serif académico), JetBrains Mono (monoespaciada).
- Paleta funcional gris-acento con colores accesibles WCAG AA para diferenciación de datos.
- Estructura con numeración académica formal: 1. Métodos · 2. Cartografía · 3. Caracterización taxonómica · 4. Análisis · 5. Identificación · 6. Cómo citar.
- Metadatos académicos visibles: ORCID, DOI placeholder, versión semántica, fecha ISO 8601, licencias, permiso SERFOR.

#### Documentación

- `docs/MEMORIA_DESCRIPTIVA.md` con sección II de co-autoría tri-personal con aportes diferenciados.
- `docs/MANUAL_USUARIO.md` actualizado.
- `docs/ESPECIFICACIONES_TECNICAS.md` actualizadas.
- `docs/DATOS_FUENTE.md` con trazabilidad completa.
- `docs/DECLARACION_JURADA_COAUTORIA.md` plantilla para co-autores.
- `docs/GUIA_DESPLIEGUE.md` nueva — instructivo paso a paso INDECOPI → GitHub → Zenodo.
- `docs/Especies_Monitoreadas_validado_RDaga.xlsx` evidencia de validación cruzada.

#### Archivos para infraestructura académica

- `CITATION.cff` para citación automática en GitHub.
- `.zenodo.json` para metadatos de DOI en Zenodo.
- `.gitignore` para limpieza del repositorio.
- `README.md` profesional con badges y estructura de proyecto académico.

#### Tecnologías

- HTML5 semántico · CSS3 con propiedades personalizadas · JavaScript ES6+ vanilla.
- SVG inline para cartografía.
- Chart.js 4.4.1 (incluida localmente en `vendor/`).
- Tipografías Inter, Source Serif 4, JetBrains Mono (vía Google Fonts con fallback a fuentes del sistema).
- Cero dependencias externas en runtime.

---

## Hoja de ruta posterior

### [1.1.0] — previsto

- Capa adicional de Áreas Naturales Protegidas (ANP) sobre el mapa.
- Localización adicional al inglés (i18n).
- Modo de impresión optimizado para captura editorial.

### [1.2.0] — previsto

- Integración de datos climáticos de SENAMHI por punto.
- Modo "clave dicotómica interactiva" para identificación asistida.

### [2.0.0] — planificación

- Plataforma colaborativa nacional con base de datos, autenticación, formulario de contribución abierta y panel de moderación.
- Registro INDECOPI separado como obra derivada.
