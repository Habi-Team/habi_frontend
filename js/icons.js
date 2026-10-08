/**
 * Iconos de Google Material Symbols Rounded cargados desde Google Fonts.
 * La versión SVG de respaldo permite navegar sin conexión a internet.
 * Material Symbols / Material Icons: Apache License 2.0.
 * https://fonts.google.com/icons
 */
(() => {
  'use strict';
  const fallback = {
    home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
    account_tree: '<path d="M5 4v16m0-12h6m-6 8h6"/><rect x="11" y="4" width="9" height="7" rx="2"/><rect x="11" y="13" width="9" height="7" rx="2"/>',
    description: '<path d="M7 2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M15 2v6h5M9 13h7M9 17h7"/>',
    calendar_month: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-11 4h4m-4 4h4"/>',
    grid_view: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    notifications: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    chevron_right: '<path d="m9 5 7 7-7 7"/>',
    chevron_left: '<path d="m15 5-7 7 7 7"/>',
    arrow_forward: '<path d="M4 12h16m-7-7 7 7-7 7"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    check_circle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    schedule: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    upload_file: '<path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v6h5m-7 10v-7m-3 3 3-3 3 3"/>',
    folder_open: '<path d="M3 6h7l2 2h9v11H3z"/>',
    list_alt: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h1m4 0h4M8 12h1m4 0h4M8 16h1m4 0h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 1c0 2-3 2-3 4m0 3h.01"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5.5 5.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    apartment: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2m-6 6v-4h4v4"/>',
    verified: '<path d="m12 2 3 2 4-.2.6 4 2.4 3.2-2.4 3.2-.6 4-4-.2-3 2-3-2-4 .2-.6-4L2 11l2.4-3.2.6-4L9 4z"/><path d="m8 11 3 3 5-6"/>',
    event: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-12 5 2 2 4-4"/>',
    task_alt: '<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
    star: '<path d="m12 2 3.2 6.6L22 9.7l-5 5 1.2 7L12 18.4l-6.2 3.3 1.2-7-5-5 6.8-1.1z"/>',
    close: '<path d="M5 5 19 19M19 5 5 19"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    file_download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    delete: '<path d="M5 7h14M8 7V4h8v3m2 0-1 14H7L6 7M10 11v7m4-7v7"/>',
    tune: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="white"/><circle cx="16" cy="12" r="2" fill="white"/><circle cx="9" cy="18" r="2" fill="white"/>',
    add: '<path d="M12 4v16M4 12h16"/>',
    location_on: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2"/>',
    edit_calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-11 7 6-6"/>',
    support_agent: '<path d="M3 12a9 9 0 0 1 18 0M3 12v5h4v-6H3m14 0h4v6h-4zm0 6a5 5 0 0 1-5 4h-2"/>',
    date_range: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
    visibility: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    arrow_back: '<path d="M20 12H4m7 7-7-7 7-7"/>',
    auto_awesome: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
    error: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>'
  };
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function icon(name, className = '') {
    return `<span class="icon ${esc(className)}" aria-hidden="true"><span class="material-symbols-rounded google-icon">${esc(name)}</span><svg class="fallback-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">${fallback[name] || fallback.info}</svg></span>`;
  }
  window.HabiIcons = { icon, esc };
  // Solo cambiar a los iconos de Google si la tipografía se cargó correctamente.
  if (document.fonts && document.fonts.load) {
    document.fonts.load('24px "Material Symbols Rounded"').then(fonts => {
      if (fonts.length) document.documentElement.classList.add('google-icons-ready');
    }).catch(() => {});
  }
})();
