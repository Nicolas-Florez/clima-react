# Clima

Aplicación web para buscar ciudades y consultar el clima actual y el pronóstico de los próximos siete días. Utiliza React, Vite y la API pública de Open-Meteo.

## Funcionalidades

- Búsqueda de ciudades por nombre con resultados de geocodificación en español.
- Pronóstico actual con temperatura, descripción del clima y velocidad del viento.
- Pronóstico diario de siete días con temperaturas mínimas y máximas.
- Resumen semanal con la temperatura máxima, mínima y el día más caluroso.
- Búsqueda con debounce de 400 ms y cancelación de peticiones anteriores.
- Interfaz adaptable a pantallas pequeñas y grandes.

La aplicación no requiere una clave de API. Necesita conexión a internet para consultar Open-Meteo.

## Requisitos

- Node.js y npm.
- Conexión a internet.

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación en el navegador.

## Comandos

```bash
npm run dev      # Iniciar el servidor de desarrollo
npm run build    # Crear la versión de producción en dist/
npm run preview  # Previsualizar la versión de producción
npm run lint     # Revisar el código con oxlint
```

## Estructura principal

```text
src/
	components/    # Formulario de búsqueda y presentación
	hooks/         # Hooks useFetch y useDebounce
	App.jsx        # Estado y coordinación de la aplicación
	clima.js       # Descripción de códigos meteorológicos
```

## APIs

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)