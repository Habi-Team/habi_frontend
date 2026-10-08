/** Pantallas y componentes del frontend Habi. Sin lógica de red ni persistencia. */
(() => {
  'use strict';
  const data = window.HABI_DATA;
  const { icon: I, esc: E } = window.HabiIcons;
  const monthFormat = new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dayFormat = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const longFormat = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dayDate = value => new Date(`${value}T12:00:00Z`);
  const shortDate = value => dayFormat.format(dayDate(value));
  const longDate = value => longFormat.format(dayDate(value));
  const routeButton = (title, route) => `<button class="text-btn" type="button" data-route="${E(route)}">${E(title)} ${I('chevron_right')}</button>`;
  const actionButton = (title, action, kind = 'primary', full = true, symbol = '') => `<button type="button" class="button ${kind}${full ? ' full' : ''}" data-action="${E(action)}">${symbol ? I(symbol) : ''}${E(title)}</button>`;
  const pageHeader = (overline, title, description) => `<div class="overline">${E(overline)}</div><h1 class="page-heading">${E(title)}</h1><p class="page-subtitle">${E(description)}</p>`;
  const section = (title, toLabel = '', route = '') => `<div class="section-heading"><h2>${E(title)}</h2>${toLabel ? (route ? routeButton(toLabel, route) : `<small>${E(toLabel)}</small>`) : ''}</div>`;
  const mini = symbol => `<span class="mini-icon">${I(symbol)}</span>`;
  const tag = state => `<span class="tag ${state === 'Completado' || state === 'Aprobado' ? 'dark' : state === 'En curso' || state === 'En revisión' ? 'outlined' : ''}">${E(state)}</span>`;
  const progress = (percent, dark = false) => `<div class="progress ${dark ? 'dark-progress' : ''}" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance de la compraventa"><span style="width:${percent}%"></span></div>`;
  const info = description => `<div class="notice">${I('info')}<span>${E(description)}</span></div>`;
  const chips = (items, chosen, prefix) => `<div class="pills" role="group" aria-label="Filtro">${items.map(item => `<button class="pill ${chosen === item ? 'active' : ''}" type="button" data-action="${prefix}:${E(item)}" aria-pressed="${chosen === item}">${E(item)}</button>`).join('')}</div>`;
  const empty = text => `<div class="empty-state">${I('search')}<br>${E(text)}</div>`;

  function inicio(state) {
    const { user } = data;
    const unread = data.notifications.filter(n => !state.read.has(n.id)).length;
    return `${pageHeader('TU ESPACIO HABI', `Hola, ${user.firstName}`, 'Tienes todo lo que necesitas para avanzar en tu compraventa.')}
      <article class="card card-dark">
        <div class="row"><span class="overline" style="color:#b5b5b5">OPERACIÓN EN CURSO</span><span class="tag light-on-dark">Activa</span></div>
        <div class="hero-address" style="margin-top:17px"><div><h3>${E(user.property)}</h3><p>${E(user.operation)}</p><p style="font-size:10px;margin-top:6px;color:#acacac">Ref. ${E(user.reference)}</p></div>${mini('apartment')}</div>
        <div class="line" style="background:#505050;margin-top:16px"></div>
        <div class="row"><span style="font-size:12px;font-weight:700">Tu proceso avanza</span><strong class="progress-number">${user.progress}%</strong></div>
        ${progress(user.progress, true)}
        <div class="row" style="margin-top:11px"><span style="font-size:11px;color:#ccc">Etapa ${user.stage} de ${user.totalStages} · Documentación</span><button class="text-btn" style="color:white" type="button" data-route="seguimiento">Ver ${I('arrow_forward')}</button></div>
      </article>
      ${section('Lo más importante', 'Ver trámites', 'tramites')}
      <article class="card"><div class="row-top"><div class="next-step">${mini('upload_file')}<div><div class="overline" style="font-size:9px">TU PRÓXIMO PASO</div><h3 style="margin-top:5px">Entrega un documento</h3><p>Certificado de tradición y libertad</p></div></div></div>
        <div class="notice" style="margin:14px 0 0">${I('schedule')}<span>Fecha límite · <strong style="color:#343434">12 de octubre</strong></span></div>
        ${actionButton('Revisar requisito', 'document:certificado', 'primary', true, 'arrow_forward')}</article>
      ${section('Tu próxima cita', 'Ver agenda', 'agenda')}
      <article class="card"><div class="inline-icon">${mini('calendar_month')}<div><h3>20 oct · 10:00 a. m.</h3><p>Reunión con tu asesor</p></div><button class="circle-action" style="margin-left:auto" data-action="event:asesor" aria-label="Ver cita">${I('chevron_right')}</button></div></article>
      ${section('Accesos rápidos')}
      <div class="quick-grid"><button type="button" data-route="documentos" class="quick">${mini('description')}Documentos</button><button type="button" data-route="guias" class="quick">${mini('help')}Guías</button><button type="button" data-route="plus" class="quick">${mini('star')}Habi Plus</button></div>
      ${unread ? `<div style="margin-top:13px">${info(`Tienes ${unread} notificaciones sin leer. Consulta el centro de alertas.`)}</div>` : ''}`;
  }

  function seguimiento() {
    return `${pageHeader('SEGUIMIENTO', 'Mi proceso', 'Conoce en qué etapa estás y qué viene después.')}
      <article class="card card-soft"><div class="row"><span class="overline">AVANCE GENERAL</span>${tag('En curso')}</div><div class="row" style="margin-top:10px"><strong class="progress-number" style="font-size:35px">25%</strong><span class="muted">Etapa 2 de 4</span></div>${progress(data.user.progress)}<p>Estamos revisando tus documentos para seguir avanzando.</p></article>
      ${section('Etapas de tu compraventa')}
      <article class="card timeline">${data.stages.map((s, n) => `<div class="timeline-step ${s.status === 'Completado' ? 'complete' : s.status === 'En curso' ? 'active' : ''}"><div class="timeline-mark">${s.status === 'Completado' ? I('check') : n + 1}</div><div class="timeline-body"><h3>${E(s.name)}</h3><p>${E(s.details)}</p>${tag(s.status)}${s.id === 'documentacion' ? actionButton('Ver documentos pendientes', 'go:documentos', 'ghost', true) : ''}</div></div>`).join('')}</article>
      ${info('Los estados y porcentajes son ilustrativos. La versión conectada consultaría el expediente en el CRM de Habi.')}`;
  }

  function documentos(state) {
    const items = data.documents.filter(d => state.docFilter === 'Todos' || (state.uploaded.has(d.id) ? 'En revisión' : d.status) === state.docFilter);
    return `${pageHeader('EXPEDIENTE DIGITAL', 'Mis documentos', 'Consulta, prepara y revisa cada requisito de tu operación.')}
      ${chips(['Todos', 'Pendiente', 'En revisión', 'Aprobado'], state.docFilter, 'docfilter')}
      <div class="row" style="margin-bottom:13px"><span class="muted">${items.length} documento${items.length === 1 ? '' : 's'}</span><span class="muted">Actualizado para demostración</span></div>
      ${items.length ? items.map(d => `<article class="card file-card"><div class="row-top">${mini('description')}<div class="file-main"><h3>${E(d.name)}</h3><p>${E(d.message)}</p><div class="file-meta">${tag(state.uploaded.has(d.id) ? 'En revisión' : d.status)}<span class="tiny">${shortDate(d.updated)}</span></div></div></div>${actionButton(d.status === 'Pendiente' && !state.uploaded.has(d.id) ? 'Revisar y adjuntar' : 'Ver detalle', `document:${d.id}`, 'ghost', true, d.status === 'Pendiente' && !state.uploaded.has(d.id) ? 'upload_file' : 'visibility')}</article>`).join('') : empty('No hay documentos para este filtro.')}
      ${section('¿Tienes dudas?', 'Ver guías', 'guias')}<div class="notice">${I('help')}<span>Te explicamos qué significa cada requisito y dónde comenzar.</span></div>`;
  }

  function tramites(state) {
    const pending = data.tasks.filter(t => t.state !== 'Completado');
    const complete = data.tasks.length - pending.length;
    const active = data.tasks.filter(t => state.taskFilter === 'Todos' || (state.taskFilter === 'Pendientes' ? t.state !== 'Completado' : t.state === 'Completado'));
    return `${pageHeader('TUS PENDIENTES', 'Mis trámites', 'Identifica tus responsabilidades y completa los próximos pasos.')}
      <div class="stat-grid"><div class="stat-box"><b>${pending.length}</b><span>Por completar</span></div><div class="stat-box"><b>${complete}</b><span>Completado</span></div></div>
      ${section('Acciones de tu proceso')}
      ${chips(['Todos', 'Pendientes', 'Completados'], state.taskFilter, 'taskfilter')}
      ${active.length ? active.map(t => `<article class="card"><div class="row-top"><div class="next-step">${mini(t.category === 'Agenda' ? 'event' : 'list_alt')}<div><h3>${E(t.name)}</h3><p>${E(t.detail)}</p></div></div></div><div class="line"></div><div class="row">${tag(t.state)}<span class="muted">${shortDate(t.date)}</span></div>${actionButton(t.id === 'certificado' ? 'Revisar documento' : t.id === 'cita' ? 'Consultar cita' : 'Ver detalle', t.id === 'certificado' ? 'document:certificado' : t.id === 'cita' ? 'event:asesor' : 'task:datos', 'ghost', true, 'chevron_right')}</article>`).join('') : empty('No hay trámites en esta categoría.')}`;
  }

  function agenda(state) {
    const date = new Date(Date.UTC(state.year, state.month, 1));
    const rawMonth = monthFormat.format(date);
    const monthName = rawMonth.charAt(0).toLocaleUpperCase('es') + rawMonth.slice(1);
    const offset = (date.getUTCDay() + 6) % 7;
    const end = new Date(Date.UTC(state.year, state.month + 1, 0)).getUTCDate();
    const prefix = `${state.year}-${String(state.month + 1).padStart(2, '0')}`;
    const calendarItems = Array(offset).fill('<span></span>');
    for (let day = 1; day <= end; day += 1) {
      const key = `${prefix}-${String(day).padStart(2, '0')}`;
      const hasEvent = data.events.some(event => event.date === key);
      calendarItems.push(`<button type="button" data-action="date:${key}" class="${hasEvent ? 'has-event' : ''} ${state.selectedDate === key ? 'selected' : ''}" aria-label="${day} de ${E(monthName)}${hasEvent ? ', con evento' : ''}" aria-pressed="${state.selectedDate === key}">${day}</button>`);
    }
    const events = data.events.filter(event => event.date.startsWith(prefix) && (!state.selectedDate || event.date === state.selectedDate));
    return `${pageHeader('ORGANIZA TUS FECHAS', 'Mi agenda', 'Visitas, reuniones y entregas en un solo calendario.')}
      <article class="card calendar-card"><div class="calendar-controls"><strong>${E(monthName)}</strong><div class="cal-buttons"><button data-action="month:-1" type="button" aria-label="Mes anterior">${I('chevron_left')}</button><button data-action="month:1" type="button" aria-label="Mes siguiente">${I('chevron_right')}</button></div></div>
      <div class="calendar-grid">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(letter => `<span class="calendar-dow">${letter}</span>`).join('')}${calendarItems.join('')}</div></article>
      ${state.selectedDate ? `<button class="text-btn" type="button" data-action="date:all" style="margin-left:auto;margin-bottom:4px">Mostrar todo el mes ${I('close')}</button>` : '<p class="muted" style="margin:0 0 14px">Selecciona una fecha para ver sus eventos.</p>'}
      ${section(state.selectedDate ? `Eventos del ${shortDate(state.selectedDate)}` : 'Próximos eventos', `${events.length} evento${events.length === 1 ? '' : 's'}`)}
      ${events.length ? events.map(event => `<article class="card"><div class="event-line"><div class="event-date"><strong>${event.date.slice(-2)}</strong><small>${shortDate(event.date).split(' ')[1]}</small></div><div><h3>${E(event.name)}</h3><p>${I('schedule')} <span>${E(event.time)}</span></p></div><button type="button" data-action="event:${event.id}" class="circle-action" aria-label="Ver detalles de ${E(event.name)}">${I('chevron_right')}</button></div></article>`).join('') : empty('No hay eventos en las fechas seleccionadas.')}
      ${info('Esta agenda es ilustrativa. Las citas y los recordatorios reales deben confirmarse con el asesor.')}`;
  }

  function notificaciones(state) {
    const unread = data.notifications.filter(n => !state.read.has(n.id)).length;
    const filtered = data.notifications.filter(n => state.notifFilter === 'Todas' || (state.notifFilter === 'Sin leer' ? !state.read.has(n.id) : n.category === state.notifFilter));
    return `${pageHeader('CENTRO DE ALERTAS', 'Notificaciones', 'Consulta avisos sobre documentos, citas y novedades.')}
      ${chips(['Todas', 'Sin leer', 'Alertas', 'Actualizaciones'], state.notifFilter, 'notifilter')}
      <div class="row" style="margin-bottom:15px"><span class="muted">${unread} sin leer</span><button type="button" class="text-btn" data-action="readAll">Marcar todas como leídas</button></div>
      ${filtered.length ? filtered.map(n => `<article class="card ${state.read.has(n.id) ? '' : 'notification-unread'}"><div class="row-top">${mini(n.category === 'Alertas' ? 'notifications' : 'verified')}<div style="flex:1;min-width:0"><div class="notification-title"><h3>${E(n.name)}</h3>${state.read.has(n.id) ? '' : '<span class="notification-dot" aria-label="Sin leer"></span>'}</div><p>${E(n.detail)}</p><div class="notification-timestamp">${E(n.time)} · ${E(n.category)}</div></div></div>${state.read.has(n.id) ? '' : actionButton('Marcar como leída', `read:${n.id}`, 'ghost', true, 'check')}</article>`).join('') : empty('No hay notificaciones con este filtro.')}`;
  }

  function guias(state) {
    const needle = state.query.toLocaleLowerCase('es').trim();
    const guides = data.guides.filter(g => (state.guideFilter === 'Todas' || state.guideFilter === g.category) && `${g.name} ${g.subtitle}`.toLocaleLowerCase('es').includes(needle));
    return `${pageHeader('CENTRO DE AYUDA', 'Guías del proceso', 'Información clara para entender cada requisito.')}
      <label class="search-box">${I('search')}<input id="guideSearch" class="input" type="search" placeholder="Buscar una guía..." aria-label="Buscar guías" value="${E(state.query)}" autocomplete="off" /></label>
      ${chips(['Todas', 'Documentos', 'Trámites'], state.guideFilter, 'guidefilter')}
      <div class="row" style="margin-bottom:12px"><span class="muted">${guides.length} resultado${guides.length === 1 ? '' : 's'}</span><span class="muted">Lectura rápida</span></div>
      ${guides.length ? guides.map(g => `<article class="card"><div class="row-top">${mini('help')}<div style="flex:1;min-width:0"><h3>${E(g.name)}</h3><p>${E(g.subtitle)}</p><div class="guide-category"><span class="tag outlined">${E(g.category)}</span></div></div></div>${actionButton('Leer guía', `guide:${g.id}`, 'ghost', true, 'arrow_forward')}</article>`).join('') : empty('Prueba otra palabra o selecciona otra categoría.')}`;
  }

  function plus(state) {
    return `${pageHeader('HABI PLUS', 'Un cierre más ágil', 'Explora cómo podría cambiar la fecha de cierre de tu proceso.')}
      <article class="card card-dark"><div class="inline-icon">${mini('auto_awesome')}<span class="overline" style="color:#ccc">EXPLORA UN ESCENARIO</span></div><h3 style="font-size:18px;letter-spacing:-.3px;margin-top:17px">¿Y si cerraras antes?</h3><p>Compara fechas para conocer cuántos días podrías anticipar un cierre hipotético.</p></article>
      ${section('Tu simulación')}
      <article class="card"><form id="plusForm" novalidate>
        <label class="form-field"><span>Fecha de cierre habitual</span><input class="input" id="regularDate" name="regularDate" aria-label="Fecha de cierre habitual" type="date" value="${E(state.regularDate)}" required /></label>
        <label class="form-field"><span>Fecha de cierre anticipado</span><input class="input" id="earlyDate" name="earlyDate" aria-label="Fecha de cierre anticipado" type="date" value="${E(state.earlyDate)}" required /></label>
        ${state.plusError ? `<div class="form-error" role="alert">${E(state.plusError)}</div>` : ''}
        <button type="submit" class="button primary full">${I('auto_awesome')} Calcular anticipación</button>
      </form></article>
      ${state.result !== null ? `<article class="card card-soft"><div class="overline" style="text-align:center">RESULTADO ESTIMADO</div><div class="plus-result"><b>${state.result}</b><br><span>días de anticipación</span><p>Tu cierre sería ${state.result} días antes de la fecha habitual.</p></div></article>` : ''}
      ${info('Simulación ilustrativa basada solo en fechas. No modifica el expediente ni representa una oferta, descuento o beneficio financiero real.')}
      ${actionButton('Conocer las condiciones', 'conditions', 'ghost', true, 'shield')}`;
  }

  function menu() {
    const entries = [
      ['Trámites pendientes', 'list_alt', 'tramites'],
      ['Notificaciones', 'notifications', 'notificaciones'],
      ['Guías del proceso', 'help', 'guias'],
      ['Habi Plus', 'star', 'plus']
    ];
    return `${pageHeader('TODO SOBRE TU OPERACIÓN', 'Explorar', 'Accede a más herramientas y detalles de tu proceso.')}
      ${entries.map(([name, symbol, route]) => `<button type="button" class="menu-item" data-route="${route}">${mini(symbol)}<strong>${E(name)}</strong>${I('chevron_right')}</button>`).join('')}
      <button type="button" class="menu-item" data-action="profile">${mini('person')}<strong>Mi perfil</strong>${I('chevron_right')}</button>
      ${info('Prototipo interactivo con datos de demostración. No se realizan trámites reales.')}`;
  }

  window.HabiScreens = {
    render: { inicio, seguimiento, documentos, tramites, agenda, notificaciones, guias, plus, menu },
    I, E, tag, info, shortDate, longDate, actionButton
  };
})();
