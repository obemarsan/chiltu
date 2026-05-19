/**
 * SolanumAtlas RCL — Gestión de filtros y estado global
 */

const FilterState = {
  species: new Set(['c', 'h', 'p', 'n']),
  basins: new Set(['r', 'ch', 'l']),
  listeners: [],

  /**
   * Suscribir un callback que se ejecuta cuando cambia el estado
   */
  subscribe(fn) {
    this.listeners.push(fn);
  },

  /**
   * Notificar a todos los suscriptores
   */
  notify() {
    this.listeners.forEach(fn => fn(this));
  },

  /**
   * Conmutar un valor en un filtro
   */
  toggle(group, value) {
    const set = group === 'species' ? this.species : this.basins;
    if (set.has(value)) {
      // No permitir desactivar todos: mínimo uno debe permanecer activo
      if (set.size > 1) set.delete(value);
    } else {
      set.add(value);
    }
    this.notify();
  },

  /**
   * Restablecer todos los filtros (todo activo)
   */
  reset() {
    this.species = new Set(['c', 'h', 'p', 'n']);
    this.basins = new Set(['r', 'ch', 'l']);
    this.notify();
  },

  /**
   * Obtener los puntos visibles bajo los filtros actuales
   */
  filterPoints(points) {
    return points.filter(p => this.species.has(p[4]) && this.basins.has(p[3]));
  },

  /**
   * Verificar si un punto es visible
   */
  isVisible(point) {
    return this.species.has(point[4]) && this.basins.has(point[3]);
  }
};

/**
 * Inicializar los controles de UI conectados al FilterState
 */
function initFilters() {
  const chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.dataset.filter;
      const value = chip.dataset.value;
      FilterState.toggle(group, value);

      // Actualizar visualmente
      const set = group === 'species' ? FilterState.species : FilterState.basins;
      if (set.has(value)) {
        chip.classList.remove('off');
        chip.setAttribute('aria-pressed', 'true');
      } else {
        chip.classList.add('off');
        chip.setAttribute('aria-pressed', 'false');
      }
    });
    // Estado inicial accesible
    chip.setAttribute('aria-pressed', 'true');
  });
}
