# SCRUM-89-92-93 — Alertas, agenda y notificaciones
## 1. Objetivo

Documentar la propuesta de interfaz para visualizar las etapas e hitos del proceso de compraventa inmobiliaria en Habi, permitiendo que el usuario comprenda en qué fase se encuentra su transacción, cuáles etapas ha completado y qué actividades debe realizar para continuar.

## 2. Descripción funcional

La interfaz permitirá al usuario consultar el progreso de su transacción mediante una representación visual de las etapas del proceso. Cada etapa presentará su nombre, estado y, cuando corresponda, la información relevante sobre sus hitos asociados.

El diseño busca mejorar la transparencia del proceso, reducir la incertidumbre del usuario y facilitar el seguimiento desde la aceptación de la oferta hasta el cierre de la transacción.

## 3. Elementos de la interfaz

- **Encabezado:** título de la sección y acceso al resumen de la transacción.
- **Indicador de progreso:** representación visual del avance general del proceso.
- **Listado de etapas:** etapas organizadas según la secuencia de la transacción.
- **Estado de cada etapa:** identificación textual de las etapas completadas, en curso y pendientes.
- **Detalle del hito:** descripción del hito, fecha relevante y observaciones disponibles.
- **Próximo hito:** identificación de la siguiente actividad importante para el usuario.
- **Acceso a documentos relacionados:** navegación hacia los documentos asociados a una etapa, cuando corresponda.

## 4. Estados de las etapas e hitos

La propuesta contempla los siguientes estados visuales:

| Estado | Descripción |
|---|---|
| Completado | La etapa o el hito ha finalizado según la información registrada. |
| En curso | La etapa se encuentra actualmente en desarrollo. |
| Pendiente | La etapa todavía no ha comenzado o requiere una acción futura. |
| Requiere atención | Existe una actividad u observación que necesita atención del usuario. |

Los estados deberán identificarse mediante texto e indicadores visuales, evitando depender exclusivamente de los colores.

La disponibilidad de estos estados y sus reglas definitivas deberá validarse con los requisitos funcionales del proyecto.

## 5. Información presentada en cada etapa

Cada etapa podrá presentar los siguientes datos, según la información disponible:

- Nombre de la etapa.
- Descripción breve.
- Estado actual.
- Hitos relacionados.
- Fecha estimada o fecha registrada.
- Observaciones relevantes.
- Documentos asociados.
- Próxima acción recomendada, cuando aplique.

Las fechas estimadas deberán distinguirse claramente de las fechas confirmadas para evitar generar expectativas incorrectas sobre los tiempos de cierre.

## 6. Flujo de navegación propuesto

1. El usuario ingresa al resumen de su transacción.
2. Selecciona la opción de etapas e hitos.
3. Visualiza el progreso general de la compraventa.
4. Selecciona una etapa para consultar sus detalles.
5. Revisa los hitos asociados, sus estados y las fechas disponibles.
6. Si existe una acción pendiente, puede acceder a la sección relacionada, como documentos o agenda de actividades.

Este flujo corresponde a una propuesta de navegación y deberá contrastarse con la arquitectura de información y el prototipo general.

## 7. Consideraciones de experiencia de usuario

- Mantener una secuencia visual coherente con el orden del proceso de compraventa.
- Destacar el estado actual sin ocultar las etapas futuras.
- Facilitar la identificación de hitos pendientes y próximos.
- Utilizar mensajes breves y comprensibles para usuarios sin conocimientos inmobiliarios o jurídicos.
- Mantener consistencia visual con el resumen de la transacción y las demás secciones.
- Garantizar legibilidad y accesibilidad en dispositivos móviles.
- Evitar mostrar información personal o documental que no sea necesaria para la consulta.

## 8. Restricciones y consideraciones

- La funcionalidad corresponde al prototipo navegable de alta fidelidad del proyecto académico.
- No contempla integración productiva con el CRM de Habi ni con sistemas notariales o financieros.
- Las etapas y los hitos definitivos deberán ajustarse a los requisitos aprobados por el equipo y a las validaciones correspondientes.
- No se deberán presentar fechas estimadas como compromisos definitivos.
- Cualquier información relacionada con trámites legales deberá ser clara y coherente con las condiciones aprobadas.
- La interfaz no modificará las condiciones comerciales ni las comisiones de Habi.

## 9. Resultado esperado

Contar con una propuesta de interfaz que permita al usuario comprender visualmente el avance de su transacción, consultar las etapas e hitos relevantes e identificar las actividades que requieren su atención.

La propuesta busca aportar transparencia, mejorar la experiencia posterior a la aceptación de la oferta y reducir la incertidumbre durante el proceso de compraventa.

## 10. Estado del trabajo

**Estado:** Documentación de diseño propuesta.

**Pendiente:**
- Validar la propuesta con los criterios de aceptación oficiales de SCRUM-54.
- Revisar la coherencia con el diseño general del prototipo.
- Incorporar evidencias del diseño visual y de la navegación cuando estén disponibles.
- Registrar las observaciones del revisor del equipo.

## 11. Trazabilidad

- **Historia de Jira:** SCRUM-54.
- **Área:** Frontend / Experiencia de usuario.
- **Repositorio:** habi_frontend.
- **Rama sugerida:** `feature/SCRUM-54-etapas-hitos`.
- **Tipo de entregable:** Documentación de diseño funcional.
