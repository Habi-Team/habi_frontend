/**
 * Información EXCLUSIVAMENTE ficticia para demostración.
 * No representa un expediente real, oferta ni integración con CRM.
 */
window.HABI_DATA = {
  user: {
    firstName: 'Lucía',
    initials: 'LC',
    operation: 'Compra de apartamento',
    property: 'Apartamento en Bogotá',
    reference: 'HABI-2026-0148',
    progress: 25,
    stage: 2,
    totalStages: 4
  },
  stages: [
    { id: 'validacion', name: 'Validación inicial', status: 'Completado', details: 'Tus datos y la información de la operación fueron verificados.' },
    { id: 'documentacion', name: 'Documentación', status: 'En curso', details: 'Estamos reuniendo y revisando los documentos de tu compraventa.' },
    { id: 'firma', name: 'Firma y cierre', status: 'Pendiente', details: 'Coordinaremos los requisitos legales y la fecha de firma.' },
    { id: 'entrega', name: 'Entrega y finalización', status: 'Pendiente', details: 'Realizaremos el cierre y la entrega del inmueble.' }
  ],
  documents: [
    { id: 'certificado', name: 'Certificado de tradición y libertad', status: 'Pendiente', updated: '2026-10-12', message: 'Necesario para verificar la situación jurídica del inmueble.', instructions: 'Adjunta un certificado legible y actualizado según las indicaciones de tu asesor.' },
    { id: 'identidad', name: 'Documento de identidad', status: 'Aprobado', updated: '2026-09-26', message: 'El documento fue verificado correctamente.', instructions: 'Tu identificación ya consta como validada en el expediente de demostración.' },
    { id: 'escritura', name: 'Escritura del inmueble', status: 'En revisión', updated: '2026-10-15', message: 'Estamos verificando la información.', instructions: 'No es necesario realizar una nueva entrega por ahora.' },
    { id: 'pazysalvo', name: 'Paz y salvo de administración', status: 'Pendiente', updated: '2026-10-18', message: 'Confirma que el inmueble no tiene pagos pendientes.', instructions: 'Solicita el soporte de paz y salvo a la administración correspondiente.' }
  ],
  tasks: [
    { id: 'certificado', name: 'Entregar documento', detail: 'Certificado de tradición y libertad', date: '2026-10-12', state: 'Pendiente', category: 'Documento' },
    { id: 'cita', name: 'Confirmar cita con tu asesor', detail: 'Reunión para revisar próximos pasos', date: '2026-10-20', state: 'Pendiente', category: 'Agenda' },
    { id: 'datos', name: 'Revisar datos del inmueble', detail: 'Información del expediente', date: '2026-09-28', state: 'Completado', category: 'Trámite' }
  ],
  events: [
    { id: 'visita', date: '2026-10-09', time: '09:00 a. m.', name: 'Visita al inmueble', detail: 'Visita de seguimiento con tu asesor.', location: 'Ubicación por confirmar' },
    { id: 'entrega', date: '2026-10-12', time: 'Todo el día', name: 'Fecha límite de documento', detail: 'Entrega del certificado de tradición y libertad.', location: 'Entrega digital' },
    { id: 'asesor', date: '2026-10-20', time: '10:00 a. m.', name: 'Reunión con tu asesor', detail: 'Revisión de documentos y siguientes etapas.', location: 'Modalidad por confirmar' },
    { id: 'revision', date: '2026-11-03', time: '11:30 a. m.', name: 'Revisión de requisitos', detail: 'Verificación del estado del expediente.', location: 'Modalidad por confirmar' }
  ],
  notifications: [
    { id: 101, name: 'Tienes un documento pendiente', detail: 'Tu certificado de tradición y libertad debe entregarse antes del 12 de octubre.', time: 'Hace 2 h', category: 'Alertas', read: false },
    { id: 102, name: 'Se acerca una cita importante', detail: 'Revisa los detalles de la reunión con tu asesor.', time: 'Ayer', category: 'Alertas', read: false },
    { id: 103, name: 'Documento aprobado', detail: 'Tu documento de identidad fue validado correctamente.', time: '26 sep', category: 'Actualizaciones', read: true },
    { id: 104, name: 'Tu proceso tiene novedades', detail: 'Puedes consultar las etapas y sus requisitos desde Seguimiento.', time: '23 sep', category: 'Actualizaciones', read: true }
  ],
  guides: [
    { id: 'certificado', name: 'Tu certificado, paso a paso', category: 'Documentos', subtitle: 'Cómo obtener y entregar tu certificado.', steps: ['Verifica los datos del inmueble asociado a tu operación.', 'Solicita el certificado en el canal oficial correspondiente.', 'Revisa que los datos sean correctos y que cumpla la vigencia indicada.', 'Consulta el requisito pendiente desde Mis documentos.'] },
    { id: 'escritura', name: '¿Qué es una escritura?', category: 'Documentos', subtitle: 'Entiende este documento esencial.', steps: ['Identifica qué inmueble y quiénes participan en la operación.', 'Consulta con tu asesor la documentación requerida.', 'Revisa la información antes de la firma y conserva una copia.'] },
    { id: 'firma', name: 'Antes de la firma', category: 'Trámites', subtitle: 'Prepárate para uno de los pasos finales.', steps: ['Valida tus datos personales y los del inmueble.', 'Confirma fecha, lugar y documentos requeridos.', 'Aclara con tu asesor las dudas antes de firmar.'] },
    { id: 'entrega', name: 'Entrega y finalización', category: 'Trámites', subtitle: 'Qué esperar de la última etapa.', steps: ['Confirma que los trámites anteriores estén completos.', 'Revisa los detalles y la fecha de entrega.', 'Conserva los soportes y documentos relevantes.'] }
  ]
};
