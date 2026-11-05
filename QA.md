# Habi · Plan de revisión GUI y pruebas de aceptación

## 1. Estándares visuales

- [ ] Los colores corresponden a los tokens `:root`; no se presenta la paleta como identidad oficial validada.
- [ ] Inter se usa como fuente propuesta, con alternativas del sistema si no carga.
- [ ] Los textos son legibles; los estados incluyen etiquetas, no solo color o icono.
- [ ] Botones, entradas y controles usan radios de 10–12 px y tamaño táctil mínimo de 44 px.
- [ ] Las tarjetas usan radios de 16 px y márgenes/espaciados consistentes.
- [ ] No se recreó ni modificó ningún logotipo institucional.
- [ ] La aplicación no utiliza el turquesa claro como texto pequeño sobre blanco.

## 2. Navegación y responsividad

- [ ] Probar Inicio, Proceso, Documentos, Agenda y Más en 320, 375/390, 768 y 1280 px.
- [ ] Desde «Más», entrar a Trámites, Notificaciones, Guías y Habi Plus.
- [ ] Revisar modo vertical y horizontal sin scroll horizontal global.
- [ ] Confirmar que el calendario y los filtros se manipulan con el dedo en móviles estrechos.
- [ ] Asegurar que la barra inferior y los diálogos respetan las áreas seguras.
- [ ] Revisar Google Material Symbols Rounded y el SVG de respaldo sin red.

## 3. Funcionalidad demostrativa

- [ ] Filtrar documentos por Pendiente, En revisión y Aprobado.
- [ ] Abrir un documento y cerrar su detalle con botón, Escape o fondo oscuro.
- [ ] Rechazar simulación de entrega sin archivo o con formato/tamaño inválido.
- [ ] Seleccionar un PDF/JPG/PNG válido y mostrar «En revisión» solo localmente.
- [ ] Filtrar trámites, consultar su responsable y abrir documentos/citas.
- [ ] Cambiar mes, seleccionar día y filtrar eventos de agenda.
- [ ] Filtrar y marcar notificaciones; acceder al elemento vinculado.
- [ ] Buscar y abrir una guía.
- [ ] Habi Plus: el ejemplo inicial debe devolver 15 días; rechazar fechas inválidas o iguales, intervalos >365 días y campos vacíos.

## 4. Accesibilidad y protección

- [ ] Probar teclado, foco visible de acciones, foco dentro de diálogos y devolución al cerrar.
- [ ] Verificar zoom de 200%, escalado de fuentes y `prefers-reduced-motion`.
- [ ] Evaluar contrastes reales en todos los componentes y estados, incluidos botones activos y deshabilitados.
- [ ] Probar TalkBack/VoiceOver y orden semántico de lectura en dispositivos reales.
- [ ] Confirmar que ninguna acción transmite información ni crea trámites reales.
- [ ] No emplear datos de usuarios reales en imágenes, vídeos o demostraciones.

**Resultados de automatización:** ver `GUI_APLICADO.md`. Los ítems marcados son verificaciones manuales pendientes, no resultados que se presumen aprobados.
