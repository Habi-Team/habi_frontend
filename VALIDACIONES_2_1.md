# HABI Frontend 2.1 — control de cambios y estado de verificación

**Fecha de preparación:** 29 de octubre de 2026. **Alcance:** mockup local interactivo, sin servicios externos ni operaciones reales.

## Mejoras implementadas en 2.1

1. Error de carga de documento visible junto al campo (`role="alert"` y `aria-invalid`); se comprueba selección, extensión, MIME cuando se informa, archivo vacío y tamaño máximo de 10 MiB. No se carga ni conserva contenido del archivo.
2. Se impide volver a simular una carga del mismo documento cuando está «En revisión» o su estado original no es «Pendiente».
3. El Inicio y la sección Trámites reflejan el estado temporal del certificado simulado; no muestran simultáneamente el mismo certificado como pendiente y en revisión.
4. Habi Plus elimina el resultado obsoleto al modificar una fecha, restablece el error y conserva validación de dos fechas, orden temporal y máximo 365 días.
5. Nuevo acceso **Más > Reiniciar demostración**, con confirmación. Permite restablecer estado del mockup: archivos simulados, lectura de notificaciones, filtros, búsqueda, mes de agenda y resultados.
6. Estilos de error y control de movimiento reducido, conservando los tokens GUI anteriores.

## Evidencias de control realizadas

- `node --check` en `js/app.js` y `js/screens.js`: sin errores sintácticos.
- `node test_static.js`: **23 comprobaciones estáticas aprobadas**, 0 fallidas. Se prueban plantillas de 9 rutas (8 pantallas funcionales más menú), filtros, estados renderizados, vacíos y resultados simulados.
- `RESULTADOS_VERIFICACION.json` documenta los 23 casos, método y limitaciones.

## Limitaciones y verificaciones pendientes

- **Prueba dinámica en navegador no realizada para 2.1.** Chromium disponible en este entorno utiliza una política administrada `URLBlocklist: ["*"]`; bloqueó tanto la URL local como el archivo HTML, por lo que NO hay capturas de esta versión verificadas en navegador.
- Las imágenes del paquete GUI anterior, si existen, pertenecen a la versión previa y no constituyen evidencia de 2.1.
- Deben repetirse manualmente pruebas en Chrome/Edge/Firefox de navegación, subida local, reinicio, filtros, teclado, responsive 320/375/390/768/1280 px, contraste, lector de pantalla y condiciones sin conexión.
- Las pruebas con personas y métricas de usabilidad no se han ejecutado. El plan y reporte de Confluence distinguen explícitamente datos pendientes de resultados observados.
- La validación de documentos es exclusivamente de interfaz; en una aplicación real el servidor debe verificar contenido, identidad y permisos.

## Instrucciones de ejecución y prueba

Abrir `front/index.html` con Live Server en un navegador sin políticas restrictivas. En **Más** seleccionar «Reiniciar demostración» antes de cada sesión. Para comprobar reglas de plantillas con Node instalado: ejecutar `node test_static.js` desde la raíz del paquete (`HABI_2_1/`).

## Propuesta de evidencias a registrar

- E01: inicio / avance y siguiente acción.
- E02: documentos / selección de archivo inválido y error.
- E03: documentos / estado «En revisión» tras archivo válido.
- E04: confirmación de reinicio de demostración.
- E05: agenda / elección de mes y fecha con evento.
- E06: guías / búsqueda con resultado y vacío.
- E07: Habi Plus / resultado de 15 días.
- E08: Habi Plus / fechas invertidas y error.
- E09: vista adaptable de escritorio.

Todas las evidencias se deben capturar en la versión 2.1 y fechar una vez se haya ejecutado en navegador autorizado.
