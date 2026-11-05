# Habi · Adaptación responsive (GUI 2.0)

La aplicación conserva HTML, CSS y JavaScript sin frameworks y sus ocho pantallas con el menú de navegación. Se adaptó el diseño conforme al documento del proyecto «Estándares de Patrones GUI».

| Ancho | Presentación |
|---|---|
| 320–360 px | Interfaz de una columna. La agenda utiliza el ancho disponible para objetivos táctiles adecuados. |
| 361–600 px | Aplicación móvil a pantalla completa con áreas seguras y barra de navegación inferior. |
| 601–1050 px | Simulador de teléfono centrado en tableta y ventanas medianas. |
| 1051 px o más | Panel informativo de escritorio + aplicación móvil interactiva. |
| Ventanas muy bajas | Se oculta el marco simulado y se conserva el contenido desplazable. |

**Validación automática en Chromium:** nueve rutas × diez viewports (320×700, 360×740, 390×844, 430×932, 600×900, 768×1024, 844×390, 1024×768, 1280×800 y 1440×900): cero desbordamientos horizontales de documento/contenido y cero excepciones JavaScript. Las pruebas se ejecutaron con recursos locales inyectados por restricciones de navegación del entorno, no en un servidor público.

**Pendiente:** pruebas manuales en iOS/Android, lector de pantalla, zoom y orientación con teclado o controles asistivos. Los colores de marca siguen sujetos a validación oficial.
