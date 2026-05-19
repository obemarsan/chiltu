/**
 * SolanumAtlas RCL — Tema y punto de entrada
 */

const Theme = {
  KEY: 'solanum-atlas-theme',

  init() {
    const stored = localStorage.getItem(this.KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    this.set(initial);

    const btn = document.getElementById('btn-theme');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  },

  set(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(this.KEY, theme);
    this.updateIcon(theme);
    // Reinicializar gráficos para que tomen el nuevo tema
    if (window.Chart && Charts.instances.abundance) {
      Charts.destroyAll();
      Charts.init();
    }
  },

  toggle() {
    const current = document.documentElement.dataset.theme || 'light';
    this.set(current === 'light' ? 'dark' : 'light');
  },

  updateIcon(theme) {
    const btn = document.getElementById('btn-theme');
    if (!btn) return;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    btn.innerHTML = theme === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
};

/**
 * Arranque de la aplicación.
 */
function bootstrap() {
  Theme.init();
  initFilters();
  MapView.init();
  initExport();

  // Esperar a que Chart.js cargue antes de inicializar gráficos
  const waitChart = () => {
    if (window.Chart) {
      Charts.init();
    } else {
      setTimeout(waitChart, 50);
    }
  };
  waitChart();

  // Reportar versión a consola
  console.log(`%cSolanumAtlas RCL v${CHILTU_VERSION}`,
    'color:#2D4A1A;font-family:serif;font-size:14px;font-style:italic');
  console.log(`Proyecto: ${CHILTU_PROJECT.resolution}`);
  console.log(`Permiso SERFOR: ${CHILTU_PROJECT.permit}`);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
