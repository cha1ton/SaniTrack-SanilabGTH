# Documentación Técnica

## 1. Resumen del proyecto

Este proyecto es una aplicación web construida con Next.js que administra onboarding y seguimiento de postulantes para el equipo de Sanilab. Está organizada con App Router y usa rutas de servidor dentro de `app/api` para exponer APIs internas que consumen datos desde SheetDB.

## 2. Arquitectura del proyecto

- Uso de Next.js con App Router: el proyecto utiliza la carpeta `app/` de Next.js, lo que indica que aprovecha el nuevo enrutamiento basado en archivos introducido en Next.js 13 y posteriores.
- Motivo de la estructura `app/<ruta>/page.js`: cada carpeta bajo `app/` con un `page.js` representa una ruta de página. Por ejemplo, `app/onboarding/page.js` genera la página `/onboarding`.
- Función de `layout.js`: `app/layout.js` actúa como diseño raíz global. Define la estructura HTML base, carga estilos globales, inyecta la barra lateral y agrega scripts compartidos (Bootstrap CSS/JS).
- Separación entre páginas, componentes, servicios y utilidades:
  - `/app` contiene rutas de páginas y APIs internas.
  - `/components` agrupa componentes de UI reutilizables.
  - `/services` agrupa servicios de acceso a datos y lógica para llamadas a SheetDB.
  - `/utils` contiene funciones auxiliares de normalización y transformación de datos.
- Flujo general de datos entre la interfaz, las APIs internas y SheetDB:
  1. La UI en `/app` y los componentes muestran datos y hacen llamadas a servicios o rutas internas.
  2. Las funciones en `/services` consumen directamente APIs de SheetDB usando `fetch` desde el servidor o el cliente.
  3. Las rutas en `/app/api/onboarding/*/route.js` actúan como backend interno que recibe solicitudes del frontend y traduce esas solicitudes a operaciones sobre SheetDB.
  4. SheetDB es el almacenamiento externo donde están las hojas de cálculo y las tablas de datos.

## 3. Árbol simplificado de directorios

```
/app
/components
/services
/utils
/public
```

Responsabilidad de cada carpeta:

- `/app`: páginas de aplicación y rutas API internas.
- `/components`: bloques de UI reutilizables y específicos por área.
- `/services`: integraciones de datos y llamadas a SheetDB.
- `/utils`: funciones auxiliares y normalizadores.
- `/public`: activos estáticos accesibles desde la aplicación.

## 4. Carpetas principales

### `/app`

Contiene:
- `layout.js`: layout global de la aplicación.
- `globals.css`: estilos globales.
- Rutas de página como `onboarding/page.js`, `postulantes-actuales/page.js`, `postulantes-antiguos/page.js`.
- APIs internas en `app/api/onboarding/*/route.js` para validar DNI, guardar progreso y obtener progreso.

### `/app/api`

Contiene funciones de servidor que exponen endpoints internos:
- `confirmar-dni`: valida DNI contra SheetDB.
- `guardar-progreso`: guarda o actualiza el progreso de onboarding.
- `obtener-progreso`: consulta el progreso de onboarding y sincroniza con SheetDB cuando es necesario.
- `validar-dni`: busca un DNI en la hoja de datos de onboarding.

### `/components`

Componentes de UI reutilizables:
- `Sidebar.js`: menú lateral global.
- `onboarding/FiltrosOnboarding.js`, `onboarding/OnboardingTimeline.js`, `onboarding/TablaOnboarding.js`: componentes para la sección de onboarding.
- `postulantes-actuales/*`: componentes para gestionar postulantes actuales.
- `postulantes-antiguos/*`: componentes para visualizar datos históricos.

### `/services`

Servicios para acceder a datos externos:
- `onboardingService.js`: obtiene y actualiza progreso de onboarding en SheetDB.
- `postulantesActualesService.js`: obtiene postulantes actuales y actualiza su estado.
- `postulantesAntiguosService.js`: obtiene postulantes antiguos desde SheetDB.

### `/utils`

Funciones auxiliares:
- `normalizersCampos.js`: contiene normalizadores de texto y datos usados por los servicios.

### `/public`

Activos estáticos servidos directamente por Next.js. En este proyecto se incluye al menos:
- `favicon.ico`

## 5. Archivos relevantes

### `layout.js`

Define el layout raíz de la aplicación. Carga Bootstrap desde CDN, incluye la barra lateral y envuelve el contenido de cada página con un `main`.

### `globals.css`

Contiene estilos globales de la aplicación, incluidos estilos base que se aplican a todas las páginas.

### `next.config.mjs`

Archivo de configuración de Next.js. En el proyecto actual no contiene opciones personalizadas, pero es el lugar para agregar configuraciones de compilación, redirecciones, imágenes, etc.

### `jsconfig.json`

Configura alias de importación para JavaScript. Actualmente define el alias `@/*` para resolver al directorio raíz del proyecto.

### `.env.local`

Archivo local de variables de entorno. No debe incluirse en control de versiones con valores reales. El proyecto usa variables de entorno para URL de SheetDB.

### `package.json`

Define los scripts y dependencias del proyecto. Los scripts principales son:
- `pnpm install`
- `pnpm run dev`
- `pnpm run build`
- `pnpm run start`
- `pnpm run lint`

Dependencias principales: `next`, `react`, `react-dom`, `chart.js`, `lucide-react`.

## 6. Tecnologías utilizadas

- Framework: Next.js
- Biblioteca UI: React
- Dependencias principales:
  - `next` v16.2.3
  - `react` v19.2.4
  - `react-dom` v19.2.4
  - `chart.js` v4.5.1
  - `lucide-react` v1.21.0
- Herramientas de desarrollo:
  - `eslint` v9
  - `eslint-config-next` v16.2.3

## 7. Requisitos del entorno

- Node.js v22.18.0 o superior
- pnpm v11.1.2 o superior

## 8. Instalación y ejecución

```bash
git clone https://github.com/cmiguel-dev/ReportesPostulantes-GTH.git
cd ReportesPostulantes-GTH
pnpm install
pnpm run dev
```

## 9. Variables de entorno

Variables encontradas en el código:

| Variable | Descripción | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SHEETDB_ONBOARDING` | URL base de SheetDB para los datos de onboarding | Sí |
| `NEXT_PUBLIC_SHEETDB_POSTULANTES_ACTUALES` | URL base de SheetDB para postulantes actuales | Sí |
| `NEXT_PUBLIC_SHEETDB_POSTULANTES_ANTIGUOS` | URL base de SheetDB para postulantes antiguos | Sí |

> Nota: Los valores reales no deben publicarse. Esta información debe ser completada manualmente por el equipo responsable si faltan variables adicionales.

## 10. Servicios externos

- SheetDB: API externa utilizada como almacenamiento de datos de hojas de cálculo para onboarding y postulantes.
- Bootstrap CDN: carga de estilos y scripts desde `cdn.jsdelivr.net`.

## 11. Notas adicionales

- No se encontraron archivos como `.env.local.example` en el proyecto.
- El archivo `next.config.mjs` está presente pero no contiene reglas personalizadas.
- El proyecto no usa TypeScript, solo configuración de alias JavaScript con `jsconfig.json`.
