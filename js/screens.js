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
  const progress = (percent, dark = false) => `<div class="progress ${dark ? 'dark-progress' : ''}" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance ilustrativo de la compraventa"><span style="width:${percent}%"></span></div>`;
  const info = description => `<div class="notice">${I('info')}<span>${E(description)}</span></div>`;
  const chips = (items, chosen, prefix) => `<div class="pills" role="group" aria-label="Filtro">${items.map(item => `<button class="pill ${chosen === item ? 'active' : ''}" type="button" data-action="${prefix}:${E(item)}" aria-pressed="${chosen === item}">${E(item)}</button>`).join('')}</div>`;
  const empty = text => `<div class="empty-state">${I('search')}<br>${E(text)}</div>`;

  function inicio(state) {
    const { user } = data;
    const unread = data.notifications.filter(n => !state.read.has(n.id)).length;
    const todayParts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const datePart = type => todayParts.find(part => part.type === type)?.value || '';
    const today = `${datePart('year')}-${datePart('month')}-${datePart('day')}`;
    const task = state.uploaded.has('certificado') ? null : data.tasks.find(item => item.id === 'certificado');
    const event = [...data.events].filter(item => item.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
    const currentStage = data.stages[user.stage - 1];
    return `${pageHeader('TU ESPACIO HABI', `Hola, ${user.firstName}`, 'Aquí puedes consultar el estado de tu compraventa y lo que sigue.')}
      <article class="card card-dark">
        <div class="row"><span class="overline">OPERACIÓN DE DEMOSTRACIÓN</span><span class="tag light-on-dark">En curso</span></div>
        <div class="hero-address" style="margin-top:17px"><div><h3>${E(user.property)}</h3><p>${E(user.operation)}</p><p class="hero-meta">Referencia ficticia: ${E(user.reference)}</p></div>${mini('apartment')}</div>
        <div class="line" style="background:#FFFFFF44;margin-top:17px"></div>
        <div class="row"><span style="font-size:14px;font-weight:650">Avance de tu proceso</span><strong class="progress-number">${user.progress}%</strong></div>
        ${progress(user.progress, true)}
        <div class="row" style="margin-top:13px;align-items:flex-start"><span class="hero-meta">Etapa ${user.stage} de ${user.totalStages} · ${E(currentStage?.name || 'Por confirmar')}</span><button class="text-btn" style="color:white" type="button" data-route="seguimiento">Ver ${I('arrow_forward')}</button></div>
      </article>
      ${section('Tu siguiente paso', 'Ver trámites', 'tramites')}
      ${task ? `<article class="card"><div class="row-top"><div class="next-step">${mini('upload_file')}<div><div class="overline">DOCUMENTO POR ENTREGAR</div><h3 style="margin-top:6px">Certificado de tradición y libertad</h3><p>Revisa el requisito y simula la entrega de tu archivo.</p></div></div></div>
        <div class="notice">${I('calendar_month')}<span><strong>Fecha límite ilustrativa:</strong> ${shortDate(task.date)}${task.date < today ? ' · Fecha vencida' : ''}</span></div>
        ${actionButton('Revisar requisito', 'document:certificado', 'primary', true, 'arrow_forward')}</article>` : `<article class="card"><div class="row-top">${mini('task_alt')}<div><h3>Documento enviado a revisión (simulación)</h3><p>El certificado pasó al estado «En revisión» solo en este navegador.</p></div></div>${actionButton('Consultar documentos', 'go:documentos', 'ghost', true, 'arrow_forward')}</article>`}
      ${section(event ? 'Siguiente evento de ejemplo' : 'Tu agenda', 'Ver agenda', 'agenda')}
      ${event ? `<article class="card"><div class="inline-icon">${mini('calendar_month')}<div><h3>${shortDate(event.date)} · ${E(event.time)}</h3><p>${E(event.name)}</p></div><button type="button" class="circle-action" style="margin-left:auto" data-action="event:${E(event.id)}" aria-label="Ver ${E(event.name)}">${I('chevron_right')}</button></div></article>` : `<div class="empty-state">${I('calendar_month')}<br>Aún no hay más eventos próximos en esta demostración.</div>`}
      ${section('Accesos rápidos')}
      <div class="quick-grid"><button type="button" data-route="documentos" class="quick">${mini('description')}Documentos</button><button type="button" data-route="guias" class="quick">${mini('menu_book')}Guías</button><button type="button" data-route="plus" class="quick">${mini('workspace_premium')}Habi Plus</button></div>
      ${unread ? `<div style="margin-top:13px">${info(`Tienes ${unread} notificaciones sin leer. Consulta el centro de alertas.`)}</div>` : ''}
      ${info('Datos, fechas y porcentajes ficticios. Esta vista no está conectada con un expediente real.')}`;
  }

  function seguimiento() {
    return `${pageHeader('SEGUIMIENTO', 'Mi proceso', 'Conoce en qué etapa estás y qué viene después.')}
      <article class="card card-soft"><div class="row"><span class="overline">AVANCE GENERAL</span>${tag('En curso')}</div><div class="row" style="margin-top:10px"><strong class="progress-number" style="font-size:35px">${data.user.progress}%</strong><span class="muted">Etapa ${data.user.stage} de ${data.user.totalStages}</span></div>${progress(data.user.progress)}<p>Estamos revisando tus documentos para seguir avanzando.</p></article>
      ${section('Etapas de tu compraventa')}
      <article class="card timeline">${data.stages.map((s, n) => `<div class="timeline-step ${s.status === 'Completado' ? 'complete' : s.status === 'En curso' ? 'active' : ''}"><div class="timeline-mark">${s.status === 'Completado' ? I('check') : n + 1}</div><div class="timeline-body"><h3>${E(s.name)}</h3><p>${E(s.details)}</p>${tag(s.status)}${s.id === 'documentacion' ? actionButton('Ver documentos pendientes', 'go:documentos', 'ghost', true) : ''}</div></div>`).join('')}</article>
      ${info('Los estados y porcentajes son ilustrativos. La versión conectada consultaría el expediente en el CRM de Habi.')}`;
  }

  function documentos(state) {
    const items = data.documents.filter(d => state.docFilter === 'Todos' || (state.uploaded.has(d.id) ? 'En revisión' : d.status) === state.docFilter);
    return `${pageHeader('EXPEDIENTE DIGITAL', 'Mis documentos', 'Consulta, prepara y revisa cada requisito de tu operación.')}
      ${chips(['Todos', 'Pendiente', 'En revisión', 'Aprobado'], state.docFilter, 'docfilter')}
      <div class="row" style="margin-bottom:13px"><span class="muted">${items.length} documento${items.length === 1 ? '' : 's'}</span><span class="muted">Actualizado para demostración</span></div>
      ${items.length ? items.map(d => `<article class="card file-card"><div class="row-top">${mini('description')}<div class="file-main"><h3>${E(d.name)}</h3><p>${E(d.message)}</p><div class="file-meta">${tag(state.uploaded.has(d.id) ? 'En revisión' : d.status)}<span class="tiny">Actualizado: ${shortDate(d.updated)}</span>${d.dueDate ? `<span class="tiny">Fecha límite (ejemplo): ${shortDate(d.dueDate)}</span>` : ''}</div></div></div>${actionButton(d.status === 'Pendiente' && !state.uploaded.has(d.id) ? 'Revisar y adjuntar' : 'Ver detalle', `document:${d.id}`, 'ghost', true, d.status === 'Pendiente' && !state.uploaded.has(d.id) ? 'upload_file' : 'visibility')}</article>`).join('') : empty('No hay documentos para este filtro.')}
      ${section('¿Tienes dudas?', 'Ver guías', 'guias')}<div class="notice">${I('help')}<span>Te explicamos qué significa cada requisito y dónde comenzar.</span></div>`;
  }

  function tramites(state) {
    const taskStatus = t => t.id === 'certificado' && state.uploaded.has('certificado') ? 'En revisión' : t.state;
    const pending = data.tasks.filter(t => taskStatus(t) !== 'Completado');
    const complete = data.tasks.length - pending.length;
    const active = data.tasks.filter(t => state.taskFilter === 'Todos' || (state.taskFilter === 'Pendientes' ? taskStatus(t) !== 'Completado' : taskStatus(t) === 'Completado'));
    return `${pageHeader('TUS PENDIENTES', 'Mis trámites', 'Identifica tus responsabilidades y completa los próximos pasos.')}
      <div class="stat-grid"><div class="stat-box"><b>${pending.length}</b><span>Por completar</span></div><div class="stat-box"><b>${complete}</b><span>Completado</span></div></div>
      ${section('Acciones de tu proceso')}
      ${chips(['Todos', 'Pendientes', 'Completados'], state.taskFilter, 'taskfilter')}
      ${active.length ? active.map(t => `<article class="card"><div class="row-top"><div class="next-step">${mini(t.category === 'Agenda' ? 'calendar_month' : 'assignment')}<div><h3>${E(t.name)}</h3><p>${E(t.detail)}</p><p class="tiny">Responsable: ${E(t.responsible || 'Por confirmar')}</p></div></div></div><div class="line"></div><div class="row">${tag(taskStatus(t))}<span class="muted">Fecha: ${shortDate(t.date)}</span></div>${actionButton(t.id === 'certificado' ? 'Revisar documento' : t.id === 'cita' ? 'Consultar cita' : 'Ver detalle', t.id === 'certificado' ? 'document:certificado' : t.id === 'cita' ? 'event:asesor' : 'task:datos', 'ghost', true, 'chevron_right')}</article>`).join('') : empty('No hay trámites en esta categoría.')}`;
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
      <div class="calendar-grid">${['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(letter => `<span class="calendar-dow">${letter}</span>`).join('')}${calendarItems.join('')}</div></article>
      ${state.selectedDate ? `<button class="text-btn" type="button" data-action="date:all" style="margin-left:auto;margin-bottom:4px">Mostrar todo el mes ${I('close')}</button>` : '<p class="muted" style="margin:0 0 14px">Selecciona una fecha para consultar los eventos del día o revisa todos los del mes.</p>'}
      ${section(state.selectedDate ? `Eventos del ${shortDate(state.selectedDate)}` : 'Eventos del mes', `${events.length} evento${events.length === 1 ? '' : 's'}`)}
      ${events.length ? events.map(event => `<article class="card"><div class="event-line"><div class="event-date"><strong>${event.date.slice(-2)}</strong><small>${shortDate(event.date).split(' ')[1]}</small></div><div><h3>${E(event.name)}</h3><p>${I('schedule')} <span>${E(event.time)}</span></p></div><button type="button" data-action="event:${event.id}" class="circle-action" aria-label="Ver detalles de ${E(event.name)}">${I('chevron_right')}</button></div></article>`).join('') : empty('No hay eventos en las fechas seleccionadas.')}
      ${info('Esta agenda es ilustrativa. Las citas y los recordatorios reales deben confirmarse con el asesor.')}`;
  }

  function notificaciones(state) {
    const unread = data.notifications.filter(n => !state.read.has(n.id)).length;
    const filtered = data.notifications.filter(n => state.notifFilter === 'Todas' || (state.notifFilter === 'Sin leer' ? !state.read.has(n.id) : n.category === state.notifFilter));
    return `${pageHeader('CENTRO DE ALERTAS', 'Notificaciones', 'Consulta avisos ficticios de documentos, citas y novedades.')}
      ${chips(['Todas', 'Sin leer', 'Alertas', 'Actualizaciones'], state.notifFilter, 'notifilter')}
      <div class="row" style="margin-bottom:15px"><span class="muted">${unread} sin leer</span><button type="button" class="text-btn" data-action="readAll">Marcar todas como leídas</button></div>
      ${filtered.length ? filtered.map(n => `<article class="card ${state.read.has(n.id) ? '' : 'notification-unread'}"><div class="row-top">${mini(n.category === 'Alertas' ? 'notifications' : 'verified')}<div style="flex:1;min-width:0"><div class="notification-title"><h3>${E(n.name)}</h3>${state.read.has(n.id) ? '' : '<span class="notification-dot" aria-hidden="true"></span>'}</div><p>${E(n.detail)}</p><div class="notification-timestamp">${E(n.time)} · ${E(n.category)} · ${state.read.has(n.id) ? 'Leída' : 'Sin leer'}</div></div></div><div class="notification-actions">${n.target ? actionButton('Ver elemento', `openNotif:${n.id}`, 'ghost', false, 'arrow_forward') : ''}${state.read.has(n.id) ? '' : actionButton('Marcar leída', `read:${n.id}`, 'ghost', false, 'check')}</div></article>`).join('') : empty('No hay notificaciones con este filtro.')}
      ${info('Todos los avisos, tiempos y documentos mostrados son ficticios.')}`;
  }

  function guias(state) {
    const needle = state.query.toLocaleLowerCase('es').trim();
    const guides = data.guides.filter(g => (state.guideFilter === 'Todas' || state.guideFilter === g.category) && `${g.name} ${g.subtitle}`.toLocaleLowerCase('es').includes(needle));
    return `${pageHeader('CENTRO DE AYUDA', 'Guías del proceso', 'Información clara para entender cada requisito.')}
      <label class="search-label" for="guideSearch">Buscar una guía</label><div class="search-box">${I('search')}<input id="guideSearch" class="input" type="search" placeholder="Por ejemplo: firma" value="${E(state.query)}" autocomplete="off" /></div>
      ${chips(['Todas', 'Documentos', 'Trámites'], state.guideFilter, 'guidefilter')}
      <div class="row" style="margin-bottom:12px"><span class="muted">${guides.length} resultado${guides.length === 1 ? '' : 's'}</span><span class="muted">Lectura rápida</span></div>
      ${guides.length ? guides.map(g => `<article class="card"><div class="row-top">${mini('menu_book')}<div style="flex:1;min-width:0"><h3>${E(g.name)}</h3><p>${E(g.subtitle)}</p><div class="guide-category"><span class="tag outlined">${E(g.category)}</span></div></div></div>${actionButton('Leer guía', `guide:${g.id}`, 'ghost', true, 'arrow_forward')}</article>`).join('') : empty('Prueba otra palabra o selecciona otra categoría.')}`;
  }

  function plus(state) {
    return `${pageHeader('HABI PLUS · SIMULACIÓN', 'Un cierre más ágil', 'Compara dos fechas hipotéticas. Este cálculo no constituye una oferta ni un servicio contratado.')}
      <article class="card card-dark"><div class="inline-icon">${mini('workspace_premium')}<span class="overline">EJEMPLO INFORMATIVO</span></div><h3 style="font-size:18px;letter-spacing:-.3px;margin-top:17px">¿Y si cerraras antes?</h3><p>Compara fechas para conocer cuántos días podrías anticipar un cierre hipotético.</p></article>
      ${section('Tu simulación')}
      <article class="card"><form id="plusForm" novalidate>
        <label class="form-field"><span>Fecha de cierre habitual</span><input class="input" id="regularDate" name="regularDate" type="date" aria-describedby="plusHelp${state.plusError ? ' plusError' : ''}" value="${E(state.regularDate)}" ${state.plusError ? 'aria-invalid="true"' : ''} required /></label>
        <label class="form-field"><span>Fecha de cierre anticipado</span><input class="input" id="earlyDate" name="earlyDate" type="date" aria-describedby="plusHelp${state.plusError ? ' plusError' : ''}" value="${E(state.earlyDate)}" ${state.plusError ? 'aria-invalid="true"' : ''} required /></label><p id="plusHelp" class="field-help">Selecciona dos fechas ficticias. La segunda debe ser anterior a la primera (máximo 365 días).</p>
        ${state.plusError ? `<div class="form-error" role="alert" id="plusError" tabindex="-1">${E(state.plusError)}</div>` : ''}
        <button type="submit" class="button primary full">${I('auto_awesome')} Calcular anticipación</button>
      </form></article>
      ${state.result !== null ? `<article class="card card-soft" id="plusResult" role="status" tabindex="-1"><div class="overline" style="text-align:center">RESULTADO ESTIMADO · SIMULACIÓN</div><div class="plus-result"><b>${state.result}</b><br><span>días de anticipación</span><p>Tu cierre sería ${state.result} días antes de la fecha habitual.</p></div></article>` : ''}
      ${info('Resultado estrictamente ilustrativo basado en fechas introducidas. No modifica el expediente ni implica aprobación, oferta, descuento o beneficio financiero.')}
      ${actionButton('Conocer las condiciones', 'conditions', 'ghost', true, 'shield')}`;
  }

  function menu() {
    const entries = [
      ['Trámites pendientes', 'assignment', 'tramites'],
      ['Notificaciones', 'notifications', 'notificaciones'],
      ['Guías del proceso', 'menu_book', 'guias'],
      ['Habi Plus', 'workspace_premium', 'plus']
    ];
    return `${pageHeader('TODO SOBRE TU OPERACIÓN', 'Explorar', 'Accede a más herramientas y detalles de tu proceso.')}
      ${entries.map(([name, symbol, route]) => `<button type="button" class="menu-item" data-route="${route}">${mini(symbol)}<strong>${E(name)}</strong>${I('chevron_right')}</button>`).join('')}
      <button type="button" class="menu-item" data-action="profile">${mini('person')}<strong>Mi perfil</strong>${I('chevron_right')}</button>
      <button type="button" class="menu-item" data-action="reset">${mini('restart_alt')}<strong>Reiniciar demostración</strong>${I('chevron_right')}</button>
      ${info('Prototipo interactivo con datos de demostración. No se realizan trámites reales.')}`;
  }

  window.HabiScreens = {
    render: { inicio, seguimiento, documentos, tramites, agenda, notificaciones, guias, plus, menu },
    I, E, tag, info, shortDate, longDate, actionButton
  };
})();
