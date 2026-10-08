# Habi · aplicación móvil interactiva

Mockup **mobile-first**, con apariencia cercana a una aplicación publicada, para la simulación de la compraventa inmobiliaria de Habi. Está desarrollado con HTML5, CSS3 y JavaScript (sin frameworks) y mantiene una estética **monocromática**.

> **Alcance:** frontend demostrativo con datos ficticios. No realiza autenticación, no contacta al CRM, no transmite documentos ni realiza trámites, transacciones u ofertas reales. El diseño es una base navegable para seguir desarrollando el frontend, **no una app productiva**.

## Iniciar

1. Abre la carpeta `front/` en Visual Studio Code.
2. Ejecuta `index.html` con **Live Server** (recomendado), o ábrelo directamente desde el explorador con un navegador moderno.
3. En escritorio verás un teléfono interactivo y un selector de las ocho pantallas. En el móvil se mostrará la interfaz a pantalla completa.
4. Para ver todas las opciones desde el teléfono, usa la pestaña **Más**.

No requiere `npm install`, compilación, tokens, API keys ni dependencias JavaScript externas.

## Pantallas

| Vista | Qué permite probar |
| --- | --- |
| Inicio | Resumen de compraventa, etapa actual, avance, pendientes y accesos directos. |
| Mi proceso | Línea de tiempo, etapas y estado de cada fase. |
| Documentos | Filtros, revisión de requisitos y entrega **local simulada** de PDF/JPG/PNG (máx. 10 MB). |
| Trámites | Pendientes, completados, navegación a documento o cita. |
| Agenda | Mes anterior/siguiente, selección de fecha, eventos y detalle. |
| Notificaciones | Filtros, marca de lectura individual y masiva. |
| Guías | Búsqueda, filtros y lectura de orientación paso a paso. |
| Habi Plus | Comparación de dos fechas de cierre, con validación y aviso de limitaciones. |

## Iconos de Google

Los iconos principales son **Google Material Symbols Rounded**, cargados de forma oficial mediante `fonts.googleapis.com` con el estilo *Rounded*, `FILL=0` y `wght=400`. Si la fuente no está disponible, la aplicación muestra automáticamente iconos SVG locales para evitar controles ilegibles. Los SVG de respaldo son ilustraciones simples y no sustituyen la biblioteca de Google.

Referencia: https://fonts.google.com/icons

Material Symbols/Material Icons: licencia Apache 2.0. Los iconos de Google requieren conexión para descargar la fuente en la primera carga; la navegación sigue funcionando sin ella.

## Organización del frontend

```text
front/
├── index.html           # Estructura del simulador y dispositivo
├── css/
│   └── styles.css       # Tokens, responsive, componentes y estados
├── js/
│   ├── icons.js         # Iconos Material + SVG de respaldo
│   ├── data.js          # Datos ficticios del expediente
│   ├── screens.js       # Plantillas/componentes de las 8 vistas
│   └── app.js           # Estado, rutas, filtros, eventos y validación
├── QA.md                # Checklist para verificar la interfaz
└── README.md
```

### Separación de responsabilidades

- `data.js` centraliza los *fixtures*. Sustituir posteriormente con servicios/API sin alterar la estructura visual.
- `screens.js` transforma el estado en componentes de presentación.
- `app.js` controla navegación y eventos y guarda cambios **solo durante la sesión abierta**.
- `icons.js` centraliza la iconografía, incluidos textos alternativos de botones.

## Historial de 4 commits incluido

Este proyecto incluye la carpeta `.git` y un historial local verificable:

```bash
git log --oneline --reverse
```

Puedes conectar un remoto nuevo desde la raíz del proyecto:

```bash
git remote add origin git@github.com:TU_ORGANIZACION/TU_REPOSITORIO.git
git push -u origin main
```

Si ya tienes un repositorio con historial existente, **no sustituyas su carpeta `.git`**: integra solamente los archivos de `front/` a la rama correspondiente mediante el proceso de integración acordado en el proyecto.

## Consideraciones

- Se usan únicamente **datos ilustrativos** para Lucía y la referencia HABI-2026-0148.
- Ningún archivo seleccionado se carga a un servidor, almacena o transmite. El cambio de estado a «En revisión» es local y temporal.
- No se simulan beneficios financieros o descuentos de Habi Plus; únicamente se muestra una diferencia entre fechas.
- La fecha, los porcentajes y los eventos son valores de demostración, no información en tiempo real.
- Sin conexiones a CRM, notarías, sistemas financieros, pasarela de pagos o notificaciones push.
- Para una implementación real se requerirían backend, autenticación, permisos, sanitización adicional del lado del servidor, controles legales y pruebas E2E.
