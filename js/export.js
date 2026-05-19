/**
 * SolanumAtlas RCL — Exportación de datos
 *
 * Exporta los puntos visibles bajo los filtros actuales en formato
 * CSV (tabular plano) o GeoJSON (compatible con QGIS, ArcGIS, geopandas).
 */

const Exporter = {
  /**
   * Genera y descarga un archivo CSV con los puntos visibles.
   */
  toCSV() {
    const filtered = FilterState.filterPoints(POINTS);
    const headers = [
      'punto_id',
      'fecha_muestreo',
      'latitud_decimal',
      'longitud_decimal',
      'altitud_msnm',
      'utm_18L_este',
      'utm_18L_norte',
      'cuenca',
      'especie',
      'especie_codigo',
      'grupo_filogenetico'
    ];

    const rows = [headers.join(',')];
    filtered.forEach((p, i) => {
      const [lat, lng, alt, basin, sp, fecha, este, norte] = p;
      const species = SPECIES[sp];
      const row = [
        i + 1,
        fecha || '',
        lat,
        lng,
        alt,
        este || '',
        norte || '',
        BASINS[basin].name,
        species.name,
        sp,
        species.group
      ];
      rows.push(row.join(','));
    });

    // Encabezado con metadatos como comentarios CSV (no estándar pero útil)
    const preamble = [
      `# SolanumAtlas RCL — exportación CSV`,
      `# Proyecto: ${CHILTU_PROJECT.resolution}`,
      `# Permiso: ${CHILTU_PROJECT.permit}`,
      `# Generado: ${new Date().toISOString()}`,
      `# Total puntos: ${filtered.length} de ${POINTS.length}`,
      `# Datos validados por Rubén Daga López (BIOPROSGEN)`,
      ``
    ].join('\n');

    this.download(preamble + rows.join('\n'), 'solanum_atlas_rcl.csv', 'text/csv;charset=utf-8');
  },

  /**
   * Genera y descarga un archivo GeoJSON conforme a RFC 7946.
   */
  toGeoJSON() {
    const filtered = FilterState.filterPoints(POINTS);

    const features = filtered.map((p, i) => {
      const [lat, lng, alt, basin, sp, fecha, este, norte] = p;
      const species = SPECIES[sp];
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat, alt]
        },
        properties: {
          id: i + 1,
          especie: species.name,
          autoridad: species.authority,
          grupo_filogenetico: species.group,
          cuenca: BASINS[basin].name,
          altitud_msnm: alt,
          fecha_muestreo: fecha || null,
          utm_18L_este: este || null,
          utm_18L_norte: norte || null,
          codigo_especie: sp,
          codigo_cuenca: basin
        }
      };
    });

    const collection = {
      type: 'FeatureCollection',
      metadata: {
        title: CHILTU_PROJECT.title,
        project: CHILTU_PROJECT.resolution,
        permit: CHILTU_PROJECT.permit,
        institution: CHILTU_PROJECT.institution,
        group: CHILTU_PROJECT.group,
        data_validation: 'Validado por Rubén Daga López (BIOPROSGEN, mayo 2026)',
        generated: new Date().toISOString(),
        total_features: features.length,
        crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC::CRS84' } }
      },
      features
    };

    this.download(
      JSON.stringify(collection, null, 2),
      'solanum_atlas_rcl.geojson',
      'application/geo+json;charset=utf-8'
    );
  },

  /**
   * Descargar un blob con el nombre dado.
   */
  download(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
};

/**
 * Conectar los botones de exportación.
 */
function initExport() {
  const csvBtn = document.getElementById('btn-export-csv');
  const geoBtn = document.getElementById('btn-export-geojson');
  if (csvBtn) csvBtn.addEventListener('click', () => Exporter.toCSV());
  if (geoBtn) geoBtn.addEventListener('click', () => Exporter.toGeoJSON());
}
