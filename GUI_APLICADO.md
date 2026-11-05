> **Nota histórica (versión anterior a 2.1):** las mediciones y capturas descritas aquí corresponden al entregable anterior. No representan pruebas del código 2.1. Para la verificación 2.1 consultar `VALIDACIONES_2_1.md` y `RESULTADOS_VERIFICACION.json`.

# Habi · Implementación de estándares GUI

**Versión:** 2.0 · 29 de octubre de 2026  
**Base:** documento «Estándares de Patrones GUI» aportado para el proyecto Habi.  
**Alcance:** prototipo HTML5/CSS3/JavaScript; no se agregaron servicios externos, autenticación ni almacenamiento real.

## 1. Tokens de diseño

Los tokens se mantienen **centralizados en `css/styles.css`** bajo `:root` para evitar valores repetidos en las pantallas:

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#6A06FA` | Botón principal, foco, selección y progreso |
| `--color-accent` | `#66F7DB` | Elementos de realce visual sobre morado |
| `--color-accent-strong` | `#00C29C` | Acentos de apoyo |
| `--color-text` | `#17171C` | Texto principal |
| `--color-text-muted` | `#595B66` | Texto secundario |
| `--color-background` | `#FFFFFF` | Fondo de aplicación |
| `--color-surface` | `#F7F7F9` | Superficies secundarias |
| `--color-border` | `#E4E4E8` | Bordes y divisores |
| `--color-danger` | `#B42332` | Errores explícitos |
| `--radius-card` | `16px` | Tarjetas |
| `--radius-control` | `12px` | Botones y entradas |
| `--font-ui` | Inter + fuentes del sistema | Tipografía de interfaz |

**Advertencia de marca:** los tres tonos morado/turquesa son referencias de terceros pendientes de validación con Habi. La fuente Inter y los neutros son decisiones del equipo académico; no deben presentarse como activos oficiales. Como no se aportó logotipo autorizado, la cabecera muestra el nombre contextual «Mi compraventa», sin recrear ni alterar el logotipo institucional.

## 2. Aplicaciones concretas

- **Navegación:** cinco accesos principales, «Inicio», «Proceso», «Documentos», «Agenda» y «Más»; opciones secundarias accesibles desde «Más».
- **Pantallas:** se actualizaron las 8 vistas y el menú con una sola jerarquía de títulos, tarjetas, filtros, estados y botones.
- **Iconos:** Google Material Symbols Rounded con respaldo SVG local cuando la fuente no se carga; iconografía de proceso, trámites, guías y Plus unificada.
- **Progreso:** mantiene el porcentaje configurado en los datos de demostración, sin calcularlo desde la presentación.
- **Documentos:** conserva filtros, estado escrito, fecha actualizada y fecha límite ficticia cuando está disponible.
- **Trámites:** muestra nombre, estado, fecha, responsabilidad de ejemplo y acceso al elemento correspondiente.
- **Agenda:** calendario de lunes a domingo, fecha seleccionada y lista accesible de eventos por fecha.
- **Notificaciones:** estado «Leída» / «Sin leer» visible, además del indicador, y acceso al elemento asociado.
- **Habi Plus:** resultados informativos, inputs etiquetados, límites de validación, avisos de error y condiciones visibles.
- **Diálogos:** título accesible, control de cierre, foco contenido dentro del modal, Escape y restitución del foco.
- **Responsividad:** aplicación a pantalla completa en móvil; simulador centrado en tableta; panel lateral en escritorio; uso de áreas seguras.

## 3. Accesibilidad y contraste

Los contrastes de combinaciones principales se validaron matemáticamente:

| Combinación | Contraste aproximado |
|---|---:|
| Morado principal `#6A06FA` sobre blanco | 6,96:1 |
| Texto morado oscuro `#4A0FB0` sobre lila `#F2EAFE` | 9,05:1 |
| Texto secundario `#595B66` sobre blanco | 6,75:1 |
| Error `#B42332` sobre rosa `#FFF0F1` | 5,88:1 |
| Éxito `#236B4E` sobre verde `#E7F6EF` | 5,73:1 |

Estas comprobaciones **no equivalen a una certificación WCAG** de todo el sistema. Faltan evaluaciones integrales con tecnologías de asistencia, distintos sistemas operativos y dispositivos físicos.

## 4. Verificación realizada

- **90 combinaciones** de 9 rutas (8 pantallas y el menú) × 10 tamaños de viewport en Chromium: **sin errores JavaScript y sin scroll horizontal global o del contenedor principal**.
- **18 escenarios de interacción**: filtros, documento simulado, validación de archivo, enlaces de notificaciones, cierre de modal, calendario, guías, simulador Plus y navegación, sin errores JS.
- Las pruebas automatizadas montan los recursos HTML/CSS/JS localmente en el navegador por una restricción del entorno de pruebas que bloquea navegación de red/archivo; no verifican conexión a Google Fonts.

## 5. Pendientes antes de un producto real

Validar paleta, fuente y logotipo con la marca; revisar en dispositivos móviles reales y lectores de pantalla; incorporar diseño final, autenticación, persistencia, integraciones y pruebas de seguridad. Los datos de «Lucía» y toda la operación permanecen **ficticios**.
