/**
 * SolanumAtlas RCL — Renderizador del mapa SVG
 *
 * Implementa una proyección equirectangular simple, adecuada para la
 * extensión geográfica del estudio (~80 × 90 km).
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

const MapView = {
  svg: null,
  pointsGroup: null,
  tooltip: null,
  width: 800,
  height: 540,

  /**
   * Inicializar el mapa: dibujar marco, ríos esquemáticos, escala y compás.
   */
  init() {
    this.svg = document.getElementById('map-svg');
    this.tooltip = document.getElementById('map-tooltip');
    if (!this.svg) return;

    this.drawRivers();
    this.drawScale();
    this.drawCompass();

    // Grupo contenedor para los puntos (se redibujan al filtrar)
    this.pointsGroup = document.createElementNS(SVG_NS, 'g');
    this.pointsGroup.id = 'map-points';
    this.svg.appendChild(this.pointsGroup);

    this.renderPoints();
    FilterState.subscribe(() => this.renderPoints());
  },

  /**
   * Proyección equirectangular: lat/lng → coordenadas SVG.
   */
  project(lat, lng) {
    const { latMin, latMax, lngMin, lngMax } = MAP_BOUNDS;
    const padding = 40;
    const innerW = this.width - 2 * padding;
    const innerH = this.height - 2 * padding;

    const x = padding + ((lng - lngMin) / (lngMax - lngMin)) * innerW;
    const y = padding + ((latMax - lat) / (latMax - latMin)) * innerH;

    return [x, y];
  },

  /**
   * Dibujar los tres ríos como paths curvos esquemáticos.
   * Las curvas se aproximaron a partir de la concentración de puntos por cuenca.
   */
  drawRivers() {
    const rivers = [
      {
        name: 'Río Chillón',
        color: 'var(--bs-ch)',
        path: 'M 50 110 Q 220 130, 370 130 T 740 95',
        labelX: 60, labelY: 100
      },
      {
        name: 'Río Rímac',
        color: 'var(--bs-r)',
        path: 'M 50 280 Q 220 295, 370 305 T 740 265',
        labelX: 60, labelY: 270
      },
      {
        name: 'Río Lurín',
        color: 'var(--bs-l)',
        path: 'M 50 470 Q 220 480, 370 470 T 740 445',
        labelX: 60, labelY: 460
      }
    ];

    rivers.forEach(r => {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', r.path);
      path.setAttribute('class', 'river-path');
      path.setAttribute('stroke', r.color);
      this.svg.appendChild(path);

      const label = document.createElementNS(SVG_NS, 'text');
      label.setAttribute('x', r.labelX);
      label.setAttribute('y', r.labelY);
      label.setAttribute('class', 'river-label');
      label.textContent = r.name;
      this.svg.appendChild(label);
    });

    // Indicador de cordillera al este
    const cord = document.createElementNS(SVG_NS, 'text');
    cord.setAttribute('x', this.width - 50);
    cord.setAttribute('y', 30);
    cord.setAttribute('text-anchor', 'end');
    cord.setAttribute('class', 'compass');
    cord.textContent = 'cordillera ↗';
    this.svg.appendChild(cord);

    // Indicador del océano al oeste
    const oc = document.createElementNS(SVG_NS, 'text');
    oc.setAttribute('x', 50);
    oc.setAttribute('y', 30);
    oc.setAttribute('class', 'compass');
    oc.textContent = '↙ océano';
    this.svg.appendChild(oc);
  },

  /**
   * Escala aproximada (~10 km).
   * Calculada para la extensión: 1° lat ≈ 111 km en estas latitudes.
   */
  drawScale() {
    const padding = 40;
    const y = this.height - 25;

    // 10 km = (10 / 111) ° lat = ~0.090°
    // El span vertical del mapa es (latMax-latMin) ≈ 0.82°
    // pixel-per-degree = innerH / span
    const innerH = this.height - 2 * padding;
    const degSpan = MAP_BOUNDS.latMax - MAP_BOUNDS.latMin;
    const pxPerDeg = innerH / degSpan;
    const scaleLen = (10 / 111) * pxPerDeg;

    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', padding);
    line.setAttribute('x2', padding + scaleLen);
    line.setAttribute('y1', y);
    line.setAttribute('y2', y);
    line.setAttribute('class', 'scale-line');
    this.svg.appendChild(line);

    // Tics laterales
    for (const xv of [padding, padding + scaleLen]) {
      const t = document.createElementNS(SVG_NS, 'line');
      t.setAttribute('x1', xv); t.setAttribute('x2', xv);
      t.setAttribute('y1', y - 3); t.setAttribute('y2', y + 3);
      t.setAttribute('class', 'scale-line');
      this.svg.appendChild(t);
    }

    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', padding + scaleLen / 2);
    label.setAttribute('y', y + 14);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'scale-text');
    label.textContent = '~10 km';
    this.svg.appendChild(label);
  },

  /**
   * Compás Norte.
   */
  drawCompass() {
    const cx = this.width - 35;
    const cy = this.height - 35;

    const arrow = document.createElementNS(SVG_NS, 'path');
    arrow.setAttribute('d', `M ${cx} ${cy - 12} L ${cx - 4} ${cy + 4} L ${cx} ${cy} L ${cx + 4} ${cy + 4} Z`);
    arrow.setAttribute('fill', 'var(--ink-soft)');
    this.svg.appendChild(arrow);

    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', cx);
    label.setAttribute('y', cy + 16);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'scale-text');
    label.textContent = 'N';
    this.svg.appendChild(label);
  },

  /**
   * Renderizar todos los puntos del muestreo, aplicando el estado de filtros.
   */
  renderPoints() {
    while (this.pointsGroup.firstChild) {
      this.pointsGroup.removeChild(this.pointsGroup.firstChild);
    }

    POINTS.forEach((pt, i) => {
      const [lat, lng, alt, basin, species, fecha, este, norte] = pt;
      const [x, y] = this.project(lat, lng);
      const visible = FilterState.isVisible(pt);

      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 5);
      circle.setAttribute('fill', SPECIES[species].color);
      circle.setAttribute('fill-opacity', visible ? 0.78 : 0.06);
      circle.setAttribute('class', 'pt');
      circle.setAttribute('data-idx', i);
      circle.style.pointerEvents = visible ? 'auto' : 'none';
      circle.setAttribute('tabindex', visible ? '0' : '-1');
      circle.setAttribute('role', 'button');
      circle.setAttribute('aria-label',
        `${SPECIES[species].name} en cuenca ${BASINS[basin].name}, altitud ${alt} metros`);

      circle.addEventListener('mouseenter', e => this.showTooltip(e, pt));
      circle.addEventListener('mouseleave', () => this.hideTooltip());
      circle.addEventListener('focus', e => this.showTooltip(e, pt));
      circle.addEventListener('blur', () => this.hideTooltip());

      this.pointsGroup.appendChild(circle);
    });
  },

  showTooltip(event, point) {
    const [lat, lng, alt, basin, species, fecha, este, norte] = point;
    const sp = SPECIES[species];
    const bs = BASINS[basin];

    // Formatear fecha en español si está disponible
    let fechaStr = '';
    if (fecha) {
      const [y, m, d] = fecha.split('-');
      const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
      fechaStr = `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`;
    }

    this.tooltip.innerHTML = `
      <span class="tt-species">${sp.name}</span>
      <span class="tt-meta">${sp.authority} · grupo ${sp.group}<br>Cuenca ${bs.name} · ${alt.toLocaleString('es-PE')} m s.n.m.${fechaStr ? '<br>Muestreado: ' + fechaStr : ''}</span>
      <span class="tt-coord">${lat.toFixed(4)}°, ${lng.toFixed(4)}°${este ? '<br>UTM 18L · ' + este.toLocaleString('es-PE') + ' E · ' + norte.toLocaleString('es-PE') + ' N' : ''}</span>
    `;

    const frame = this.svg.closest('.map-frame');
    const rect = frame.getBoundingClientRect();
    const cx = event.clientX - rect.left;
    const cy = event.clientY - rect.top;

    this.tooltip.style.left = Math.min(rect.width - 280, cx + 12) + 'px';
    this.tooltip.style.top = Math.max(10, cy - 50) + 'px';
    this.tooltip.classList.add('show');
  },

  hideTooltip() {
    this.tooltip.classList.remove('show');
  }
};
