/** Habi / controlador de navegación e interacciones locales. */
(() => {
  'use strict';

  const data = window.HABI_DATA;
  const UI = window.HabiScreens;
  const { I, E, tag, info, shortDate, longDate, actionButton } = UI;
  const $ = selector => document.querySelector(selector);
  const main = $('#appContent');
  const sheet = $('#sheet');
  const scrim = $('#scrim');
  const toastNode = $('#toast');
  const routes = {
    inicio: ['Inicio', 'home'],
    seguimiento: ['Mi proceso', 'account_tree'],
    documentos: ['Documentos', 'description'],
    tramites: ['Trámites', 'list_alt'],
    agenda: ['Agenda', 'calendar_month'],
    notificaciones: ['Notificaciones', 'notifications'],
    guias: ['Guías', 'help'],
    plus: ['Habi Plus', 'star'],
    menu: ['Explorar', 'grid_view']
  };
  const tabs = ['inicio', 'seguimiento', 'documentos', 'agenda', 'menu'];
  const state = {
    page: Object.hasOwn(routes, location.hash.slice(1)) ? location.hash.slice(1) : 'inicio',
    docFilter: 'Todos', taskFilter: 'Todos', notifFilter: 'Todas', guideFilter: 'Todas',
    read: new Set(data.notifications.filter(n => n.read).map(n => n.id)),
    uploaded: new Set(),
    year: 2026, month: 9, selectedDate: null,
    query: '', regularDate: '2026-11-30', earlyDate: '2026-11-15',
    result: null, plusError: ''
  };
  let toastTimer = null;
  let previousFocus = null;

  const navigationButton = key => {
    const [label, symbol] = routes[key];
    const active = state.page === key || (key === 'menu' && !tabs.includes(state.page));
    return `<button type="button" data-route="${key}" class="${active ? 'active' : ''}" aria-label="${label}" ${active ? 'aria-current="page"' : ''}>${I(symbol)}<span>${E(label === 'Documentos' ? 'Docs' : label === 'Mi proceso' ? 'Proceso' : label === 'Explorar' ? 'Más' : label)}</span></button>`;
  };

  function render() {
    main.innerHTML = UI.render[state.page](state);
    $('#bottomNav').innerHTML = tabs.map(navigationButton).join('');
    const count = data.notifications.filter(n => !state.read.has(n.id)).length;
    $('#notificationButton').innerHTML = `${I('notifications')}${count ? '<span class="unread-indicator" aria-hidden="true"></span>' : ''}`;
    $('#notificationButton').setAttribute('aria-label', `Notificaciones${count ? `, ${count} sin leer` : ''}`);
    $('#desktopRoutes').innerHTML = Object.entries(routes).filter(([key]) => key !== 'menu').map(([key, [title]], index) => `<button type="button" data-route="${key}" class="rail-link ${state.page === key ? 'active' : ''}" ${state.page === key ? 'aria-current="page"' : ''}><b>${String(index + 1).padStart(2, '0')}</b>${E(title)}<span class="rail-chevron">${I('chevron_right')}</span></button>`).join('');
  }

  function navigate(target, updateHistory = true) {
    if (!Object.hasOwn(routes, target)) return;
    closeSheet();
    state.page = target;
    render();
    main.scrollTop = 0;
    if (updateHistory && location.hash !== `#${target}`) history.pushState({ page: target }, '', `#${target}`);
  }

  function showToast(message) {
    toastNode.textContent = message;
    toastNode.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastNode.classList.remove('show'), 2900);
  }

  function openSheet(title, body, footer = actionButton('Entendido', 'close', 'primary', false)) {
    previousFocus = document.activeElement;
    sheet.innerHTML = `<div class="sheet-handle"></div><div class="sheet-header"><h2>${E(title)}</h2><button type="button" class="circle-action" data-action="close" aria-label="Cerrar ventana">${I('close')}</button></div><div class="sheet-body">${body}</div><div class="sheet-footer">${footer}</div>`;
    sheet.hidden = false;
    scrim.hidden = false;
    sheet.querySelector('[data-action="close"]').focus();
  }

  function closeSheet() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    scrim.hidden = true;
    sheet.innerHTML = '';
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    previousFocus = null;
  }

  function showDocument(id) {
    const documentData = data.documents.find(d => d.id === id);
    if (!documentData) return;
    const simulated = state.uploaded.has(id);
    const status = simulated ? 'En revisión' : documentData.status;
    const canUpload = status === 'Pendiente';
    const body = `<div class="row" style="margin-bottom:16px">${tag(status)}<span class="muted">${shortDate(documentData.updated)}</span></div>
      <p>${E(documentData.message)}</p><p>${E(documentData.instructions)}</p>
      ${info('Esta es una vista de demostración: no se consultan ni almacenan documentos reales.')}
      ${canUpload ? `<label class="form-field"><span>Seleccionar archivo (PDF, JPG o PNG, máximo 10 MB)</span><input id="uploadInput" class="input" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" /></label>` : ''}`;
    openSheet(documentData.name, body, canUpload ? actionButton('Simular entrega', `upload:${id}`, 'primary', false, 'upload_file') : actionButton('Cerrar detalle', 'close', 'ghost', false));
  }

  function showEvent(id) {
    const event = data.events.find(item => item.id === id);
    if (!event) return;
    openSheet(event.name, `<p><strong>Fecha:</strong> ${longDate(event.date)}</p><p><strong>Hora:</strong> ${E(event.time)}</p><p><strong>Lugar:</strong> ${E(event.location)}</p><p>${E(event.detail)}</p>${info('Este evento es ficticio. Confirma los detalles reales con tu asesor.')}`);
  }

  function showGuide(id) {
    const guide = data.guides.find(item => item.id === id);
    if (!guide) return;
    openSheet(guide.name, `<span class="tag outlined">${E(guide.category)}</span><p>${E(guide.subtitle)}</p><ol class="guide-step-list">${guide.steps.map(step => `<li>${E(step)}</li>`).join('')}</ol>${info('Guía de orientación general. Los documentos y condiciones definitivos deben validarse con Habi.')}`);
  }

  function processUpload(id) {
    const selected = $('#uploadInput')?.files?.[0];
    if (!selected) return showToast('Selecciona un archivo antes de continuar.');
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    const suffixOk = /\.(pdf|jpe?g|png)$/i.test(selected.name);
    if (!suffixOk || (selected.type && !allowed.includes(selected.type))) return showToast('Solo se permiten archivos PDF, JPG y PNG.');
    if (selected.size > 10 * 1024 * 1024) return showToast('El archivo debe ocupar menos de 10 MB.');
    if (selected.size === 0) return showToast('No puedes adjuntar un archivo vacío.');
    state.uploaded.add(id);
    closeSheet();
    render();
    showToast('Entrega simulada. No se ha enviado el archivo.');
  }

  function setFilter(field, choice, allowed) {
    if (!allowed.includes(choice)) return;
    state[field] = choice;
    render();
  }

  function changeMonth(delta) {
    const first = new Date(Date.UTC(state.year, state.month + delta, 1));
    if (first.getUTCFullYear() < 2025 || first.getUTCFullYear() > 2029) return showToast('El calendario de demostración cubre 2025 a 2029.');
    state.year = first.getUTCFullYear();
    state.month = first.getUTCMonth();
    state.selectedDate = null;
    render();
  }

  function act(expression) {
    const divider = expression.indexOf(':');
    const cmd = divider < 0 ? expression : expression.slice(0, divider);
    const value = divider < 0 ? '' : expression.slice(divider + 1);
    switch (cmd) {
      case 'go': return navigate(value);
      case 'close': return closeSheet();
      case 'profile': return openSheet('Mi perfil', `<div class="inline-icon" style="margin-bottom:13px"><span class="avatar" style="display:grid;place-items:center">LC</span><div><strong>Lucía</strong><br><span class="muted">Cliente de demostración</span></div></div><p><strong>Expediente:</strong> ${E(data.user.reference)}</p>${info('Los datos personales son ficticios. El inicio de sesión real no forma parte de este mockup.')}`);
      case 'document': return showDocument(value);
      case 'upload': return processUpload(value);
      case 'docfilter': return setFilter('docFilter', value, ['Todos', 'Pendiente', 'En revisión', 'Aprobado']);
      case 'taskfilter': return setFilter('taskFilter', value, ['Todos', 'Pendientes', 'Completados']);
      case 'notifilter': return setFilter('notifFilter', value, ['Todas', 'Sin leer', 'Alertas', 'Actualizaciones']);
      case 'guidefilter': return setFilter('guideFilter', value, ['Todas', 'Documentos', 'Trámites']);
      case 'read': {
        const number = Number(value);
        if (data.notifications.some(item => item.id === number)) state.read.add(number);
        return render();
      }
      case 'readAll': {
        data.notifications.forEach(item => state.read.add(item.id));
        render();
        return showToast('Todas las notificaciones están marcadas como leídas.');
      }
      case 'guide': return showGuide(value);
      case 'event': return showEvent(value);
      case 'month': return changeMonth(Number(value) || 0);
      case 'date': {
        state.selectedDate = value === 'all' ? null : value;
        return render();
      }
      case 'task': return openSheet('Detalle del trámite', `<p>La revisión de los datos del inmueble está completada en el expediente ficticio.</p>${info('No se modifica información de la operación desde este prototipo.')}`);
      case 'conditions': return openSheet('Condiciones Habi Plus', `<p>El cálculo de este prototipo mide exclusivamente la diferencia entre dos fechas.</p><p>No representa una oferta comercial, aprobación, ahorro garantizado ni una actualización de las condiciones de Habi Plus.</p>${info('Solicita a un asesor información oficial sobre servicios, costos y beneficios disponibles.')}`);
      default: return undefined;
    }
  }

  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const date = new Date(`${value}T12:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
  }

  function calculatePlus() {
    const normal = validDate(state.regularDate);
    const advance = validDate(state.earlyDate);
    if (!normal || !advance) state.plusError = 'Completa las dos fechas para calcular el escenario.';
    else {
      const days = Math.round((normal - advance) / 86400000);
      state.plusError = days <= 0 ? 'La fecha anticipada debe ser anterior a la fecha habitual.' : days > 365 ? 'Para la demostración, elige una diferencia de máximo 365 días.' : '';
      if (!state.plusError) state.result = days;
    }
    if (state.plusError) state.result = null;
    render();
  }

  document.addEventListener('click', event => {
    const route = event.target.closest('[data-route]');
    if (route) return navigate(route.dataset.route);
    const button = event.target.closest('[data-action]');
    if (button) act(button.dataset.action);
  });

  document.addEventListener('input', event => {
    if (event.target.id === 'guideSearch') {
      const cursor = event.target.selectionStart;
      state.query = event.target.value;
      render();
      const input = $('#guideSearch');
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
    if (event.target.id === 'regularDate') state.regularDate = event.target.value;
    if (event.target.id === 'earlyDate') state.earlyDate = event.target.value;
  });
  document.addEventListener('submit', event => {
    if (event.target.id !== 'plusForm') return;
    event.preventDefault();
    state.regularDate = $('#regularDate').value;
    state.earlyDate = $('#earlyDate').value;
    calculatePlus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !sheet.hidden) closeSheet();
    if (event.key === 'Tab' && !sheet.hidden) {
      const focusable = Array.from(sheet.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  scrim.addEventListener('click', closeSheet);
  window.addEventListener('popstate', () => navigate(Object.hasOwn(routes, location.hash.slice(1)) ? location.hash.slice(1) : 'inicio', false));
  window.addEventListener('hashchange', () => {
    const page = location.hash.slice(1);
    if (Object.hasOwn(routes, page) && page !== state.page) navigate(page, false);
  });

  render();
})();
