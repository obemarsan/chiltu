# Chiltu

**Atlas digital de diversidad de tomate silvestre (*Solanum* spp.) del Perú**

[![Version](https://img.shields.io/badge/version-1.0.0-005CB9)](VERSION)
[![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-1357A3)](LICENSE.txt)
[![SERFOR](https://img.shields.io/badge/SERFOR-AUT--IFL--2025--076-2C5C24)](docs/MEMORIA_DESCRIPTIVA.md)
[![DOI](https://img.shields.io/badge/DOI-pendiente_Zenodo-9AA1AB)](#cómo-citar)

> *Chiltu* significa **tomate** en quechua cuzqueño. El proyecto honra el origen andino de los parientes silvestres del tomate domesticado: 14 de las 17 especies conocidas del género *Solanum* sect. *Lycopersicon* crecen en territorio peruano.

Versión piloto sobre las cuencas **Rímac, Chillón y Lurín** del departamento de Lima.

---

## Vista previa

Atlas interactivo con **88 puntos georreferenciados** y **4 especies** de *Solanum* sect. *Lycopersicon* registradas *in situ* bajo permiso SERFOR AUT-IFL-2025-076.

- Cartografía interactiva con filtros por especie y por cuenca
- Caracterización morfo-anatómica de las 4 especies
- Comparación de índices ecológicos entre las 3 cuencas (Shannon, Simpson, Margalef, Berger-Parker)
- Distribución por piso altitudinal (550–3694 m s.n.m.)
- Exportación de datos en CSV y GeoJSON
- Operación offline tras la primera carga

---

## Cómo usar

### Opción 1 — Abrir directamente

1. Descargar el ZIP desde la pestaña [Releases](../../releases) o clonar el repositorio.
2. Descomprimir y abrir el archivo `index.html` en cualquier navegador moderno.
3. No requiere servidor, instalación ni dependencias.

### Opción 2 — Servidor local

```bash
git clone https://github.com/obemarsan/chiltu.git
cd chiltu
python3 -m http.server 8000
# Abrir http://localhost:8000 en el navegador
```

### Opción 3 — En línea (GitHub Pages)

Disponible próximamente en: `https://obemarsan.github.io/chiltu/`

---

## Co-autoría

| Co-autor | Aporte principal | ORCID |
|----------|------------------|-------|
| **Obert Marín Sánchez** · MSc. | Arquitectura, programación íntegra del código, diseño visual, documentación técnica | [0000-0003-2912-1191](https://orcid.org/0000-0003-2912-1191) |
| **Rubén Armando Daga López** · Mg. | Curaduría científica del dataset, validación cruzada, generación del XLSX canónico | [0000-0002-3105-1594](https://orcid.org/0000-0002-3105-1594) |
| **Jacinto Joaquín Vertiz Osores** · Dr. | Elaboración del informe final del proyecto base, revisión científica del contenido, marco interpretativo | [0000-0003-2774-1207](https://orcid.org/0000-0003-2774-1207) |

**Grupo**: BIOPROSGEN — Bioprospección en Salud Ambiental y Metagenómica
**Institución**: Universidad Nacional Tecnológica de Lima Sur (UNTELS)

---

## Fuente de los datos

Los 88 puntos georreferenciados y todo el contenido científico provienen del informe final del proyecto **RCU 125-2024-UNTELS-CU** ejecutado por el grupo BIOPROSGEN bajo permiso SERFOR **AUT-IFL-2025-076**.

Ver detalle de trazabilidad en [`docs/DATOS_FUENTE.md`](docs/DATOS_FUENTE.md).

---

## Cómo citar

**APA 7**
> Marín Sánchez, O., Daga López, R. A., & Vertiz Osores, J. J. (2026). *Chiltu: Atlas de tomate silvestre del Perú* (Versión 1.0.0) [Software]. Grupo de Investigación en Bioprospección en Salud Ambiental y Metagenómica (BIOPROSGEN), Universidad Nacional Tecnológica de Lima Sur (UNTELS).

**Vancouver**
> Marín Sánchez O, Daga López RA, Vertiz Osores JJ. Chiltu: Atlas de tomate silvestre del Perú [software]. Versión 1.0.0. Lima: Grupo de Investigación en Bioprospección en Salud Ambiental y Metagenómica (BIOPROSGEN) de la Universidad Nacional Tecnológica de Lima Sur (UNTELS); 2026.

**BibTeX** — disponible en [`CITATION.cff`](CITATION.cff) y dentro del atlas.

---

## Hoja de ruta

- [x] **v1.0.0** — Piloto cerrado sobre cuencas Rímac, Chillón y Lurín (esta versión)
- [ ] **v1.1** — Capa adicional de Áreas Naturales Protegidas (ANP)
- [ ] **v1.2** — Integración con datos climáticos SENAMHI por punto
- [ ] **v2.0** — Plataforma colaborativa nacional con base de datos y contribución abierta (en planificación)

---

## Licencias

- **Software**: [CC BY-NC 4.0](LICENSE.txt) — uso académico no comercial con atribución.
- **Datos**: ODbL 1.0 — atribuir BIOPROSGEN-UNTELS y citar SERFOR AUT-IFL-2025-076.
- **Documentación**: CC BY 4.0.

---

## Registros oficiales

- **INDECOPI** — Pendiente de registro (Mayo–Junio 2026)
- **Zenodo / DOI** — Pendiente de depósito tras release v1.0.0
- **Proyecto base** — RCU 125-2024-UNTELS-CU (UNTELS, 2024)
- **Permiso SERFOR** — AUT-IFL-2025-076 / RD 000148-2025-MIDAGRI-SERFOR-DGGSPFFS-DGSPF

---

## Contacto

Para reportes técnicos, contribuciones o consultas científicas, abrir un [Issue](../../issues) o contactar al grupo BIOPROSGEN de la Universidad Nacional Tecnológica de Lima Sur.

---

*"Chiltu" · del quechua, tomate*
