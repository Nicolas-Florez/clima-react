import { useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import { useDebounce } from './hooks/useDebounce.js';
import { useFetch } from './hooks/useFetch.js';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

function App() {
  const [texto, setTexto] = useState('');
  const [ciudad, setCiudad] = useState(null);
  const textoDebounced = useDebounce(texto, 400);

  const urlCiudades = textoDebounced.trim().length >= 3
    ? `${GEOCODING_URL}?name=${encodeURIComponent(textoDebounced.trim())}&count=5&language=es`
    : null;
  const busqueda = useFetch(urlCiudades);

  const urlPronostico = ciudad
    ? `${FORECAST_URL}?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    : null;
  const pronostico = useFetch(urlPronostico);

  const resumen = useMemo(() => {
    const diario = pronostico.datos?.daily;
    if (!diario?.temperature_2m_max?.length) return null;

    console.log('calculando resumen');
    const maxima = Math.max(...diario.temperature_2m_max);
    const minima = Math.min(...diario.temperature_2m_min);
    const indiceDiaCaluroso = diario.temperature_2m_max.indexOf(maxima);

    return {
      maxima,
      minima,
      diaCaluroso: diario.time[indiceDiaCaluroso],
    };
  }, [pronostico.datos]);

  function limpiar() {
    setTexto('');
    setCiudad(null);
  }

  return (
    <Layout
      texto={texto}
      setTexto={setTexto}
      ciudades={busqueda.datos?.results ?? []}
      buscando={busqueda.cargando}
      errorBusqueda={busqueda.error}
      puedeMostrarResultados={textoDebounced.trim().length >= 3}
      ciudad={ciudad}
      seleccionarCiudad={setCiudad}
      limpiar={limpiar}
      pronostico={pronostico}
      resumen={resumen}
    />
  );
}

export default App;
