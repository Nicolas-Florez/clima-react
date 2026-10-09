import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [resultado, setResultado] = useState({ url: null, datos: null, error: null });

  useEffect(() => {
    if (!url) return undefined;

    const controller = new AbortController();

    async function cargar() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        const datos = await response.json();
        if (!controller.signal.aborted) setResultado({ url, datos, error: null });
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError' && !controller.signal.aborted) {
          setResultado({ url, datos: null, error: fetchError });
        }
      }
    }

    cargar();
    return () => controller.abort();
  }, [url]);

  const resultadoActual = resultado.url === url;
  return {
    datos: url && resultadoActual ? resultado.datos : null,
    cargando: Boolean(url) && !resultadoActual,
    error: url && resultadoActual ? resultado.error : null,
  };
}