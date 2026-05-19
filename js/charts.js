/**
 * SolanumAtlas RCL — Gráficos analíticos
 *
 * Renderiza visualizaciones de:
 *   1. Abundancia por especie en cada cuenca (Tabla 7 del informe)
 *   2. Distribución por piso altitudinal (Tabla 3 del informe)
 *   3. Índices ecológicos comparados (Tabla 1 del informe)
 */

const Charts = {
  instances: {},

  /**
   * Color resuelto desde variables CSS según el tema activo.
   */
  resolveColor(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  },

  /**
   * Configuración tipográfica común para todos los gráficos.
   */
  baseFont() {
    return {
      family: getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace',
      size: 11
    };
  },

  /**
   * Detectar tema y devolver paleta para Chart.js.
   */
  palette() {
    const isDark = document.documentElement.dataset.theme === 'dark';
    return {
      text: isDark ? '#C7BFAF' : '#4A3F33',
      mute: isDark ? '#8C8474' : '#7A6E5E',
      grid: isDark ? 'rgba(247, 240, 226, 0.06)' : 'rgba(26, 22, 18, 0.06)',
      sp: {
        c: SPECIES.c.color,
        h: SPECIES.h.color,
        p: SPECIES.p.color,
        n: SPECIES.n.color
      }
    };
  },

  /**
   * Inicializar todos los gráficos. Se reinicializan al cambiar tema.
   */
  init() {
    this.renderAbundance();
    this.renderAltitude();
    this.renderIndices();
  },

  destroyAll() {
    Object.values(this.instances).forEach(c => c && c.destroy());
    this.instances = {};
  },

  renderAbundance() {
    const ctx = document.getElementById('chart-abundance');
    if (!ctx) return;
    const p = this.palette();

    this.instances.abundance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cuenca del Rímac', 'Cuenca del Chillón', 'Cuenca del Lurín'],
        datasets: [
          { label: 'S. corneliomulleri', data: [262, 220, 93], backgroundColor: p.sp.c },
          { label: 'S. habrochaites',    data: [0, 97, 17],   backgroundColor: p.sp.h },
          { label: 'S. pimpinellifolium', data: [14, 9, 64],  backgroundColor: p.sp.p },
          { label: 'S. pennellii',       data: [0, 12, 8],    backgroundColor: p.sp.n }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: p.text,
              font: this.baseFont(),
              boxWidth: 12,
              padding: 14,
              usePointStyle: true,
              pointStyle: 'rect'
            }
          },
          tooltip: {
            backgroundColor: p.text,
            titleFont: this.baseFont(),
            bodyFont: this.baseFont()
          }
        },
        scales: {
          x: { ticks: { color: p.text, font: this.baseFont() }, grid: { display: false } },
          y: {
            beginAtZero: true,
            ticks: { color: p.text, font: this.baseFont() },
            grid: { color: p.grid },
            title: { display: true, text: 'individuos contados', color: p.mute, font: this.baseFont() }
          }
        }
      }
    });
  },

  renderAltitude() {
    const ctx = document.getElementById('chart-altitude');
    if (!ctx) return;
    const p = this.palette();

    const labels = [];
    const cor = [], hab = [], pim = [], pen = [];
    const order = ['r', 'ch', 'l'];

    order.forEach(b => {
      ALTITUDE_DISTRIBUTION.bands.forEach((band, i) => {
        labels.push(`${BASINS[b].name} · ${band}`);
        cor.push(ALTITUDE_DISTRIBUTION.data[b].c[i]);
        hab.push(ALTITUDE_DISTRIBUTION.data[b].h[i]);
        pim.push(ALTITUDE_DISTRIBUTION.data[b].p[i]);
        pen.push(ALTITUDE_DISTRIBUTION.data[b].n[i]);
      });
    });

    this.instances.altitude = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: 'S. corneliomulleri', data: cor, backgroundColor: p.sp.c },
          { label: 'S. habrochaites',    data: hab, backgroundColor: p.sp.h },
          { label: 'S. pimpinellifolium', data: pim, backgroundColor: p.sp.p },
          { label: 'S. pennellii',       data: pen, backgroundColor: p.sp.n }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: p.text,
              font: this.baseFont(),
              boxWidth: 12,
              padding: 14,
              usePointStyle: true,
              pointStyle: 'rect'
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: p.text, font: this.baseFont() },
            grid: { color: p.grid }
          },
          y: {
            stacked: true,
            ticks: { color: p.text, font: this.baseFont(), autoSkip: false },
            grid: { display: false }
          }
        }
      }
    });
  },

  renderIndices() {
    const ctx = document.getElementById('chart-indices');
    if (!ctx) return;
    const p = this.palette();

    this.instances.indices = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Shannon (H')", 'Simpson (1-D)', 'Margalef', 'Equidad J'],
        datasets: [
          {
            label: 'Rímac',
            data: [
              BASINS.r.indices.shannon,
              BASINS.r.indices.simpson,
              BASINS.r.indices.margalef,
              BASINS.r.indices.evenness
            ],
            backgroundColor: this.resolveColor('--bs-r')
          },
          {
            label: 'Chillón',
            data: [
              BASINS.ch.indices.shannon,
              BASINS.ch.indices.simpson,
              BASINS.ch.indices.margalef,
              BASINS.ch.indices.evenness
            ],
            backgroundColor: this.resolveColor('--bs-ch')
          },
          {
            label: 'Lurín',
            data: [
              BASINS.l.indices.shannon,
              BASINS.l.indices.simpson,
              BASINS.l.indices.margalef,
              BASINS.l.indices.evenness
            ],
            backgroundColor: this.resolveColor('--bs-l')
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: p.text,
              font: this.baseFont(),
              boxWidth: 12,
              padding: 14,
              usePointStyle: true,
              pointStyle: 'rect'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(3)}`
            }
          }
        },
        scales: {
          x: { ticks: { color: p.text, font: this.baseFont() }, grid: { display: false } },
          y: {
            beginAtZero: true,
            ticks: {
              color: p.text,
              font: this.baseFont(),
              callback: v => v.toFixed(2)
            },
            grid: { color: p.grid }
          }
        }
      }
    });
  }
};
