import { useState, useEffect } from "react";

export function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const getFromApi = async (url) => {
    try {
        console
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${url}&count=5&language=es`)
        if (!response.ok) {
            throw new Error('Fallo en buscar ciudades')
        }
        const fetched = await response.json()
        setDatos(fetched)
        console.log(fetched)
        return fetched
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    if (!url) return;
    const control = new AbortController();
    getFromApi(url)
    // el mismo fetch con try, catch y finally
    return () => control.abort();
}, [url]);

return { datos, cargando, error };
}

export default useFetch;