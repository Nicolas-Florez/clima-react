import { useEffect, useRef } from 'react';

function Formulario({
    texto,
    setTexto,
    ciudades,
    buscando,
    error,
    puedeMostrarResultados,
    seleccionarCiudad,
    limpiar,
    ciudadSeleccionada,
}) {
    const entrada = useRef(null);

    useEffect(() => {
        entrada.current?.focus();
    }, []);

    function limpiarFormulario(event) {
        event.preventDefault();
        limpiar();
        entrada.current?.focus();
    }

    return (
        <section className="space-y-3">
            <form className="flex gap-2" onSubmit={(event) => event.preventDefault()}>
                <label className="sr-only" htmlFor="busqueda-ciudad">Buscar ciudad</label>
                <input
                    ref={entrada}
                    id="busqueda-ciudad"
                    type="search"
                    autoComplete="off"
                    placeholder="Busca una ciudad..."
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                    value={texto}
                    onChange={(event) => setTexto(event.target.value)}
                />
                <button
                    type="button"
                    onClick={limpiarFormulario}
                    className="shrink-0 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                    Limpiar
                </button>
            </form>

            {buscando && <p className="text-sm text-slate-600" role="status">Buscando ciudades...</p>}
            {error && <p className="text-sm text-red-700" role="alert">No se pudieron buscar ciudades. Inténtalo de nuevo.</p>}
            {!buscando && !error && puedeMostrarResultados && ciudades.length === 0 && (
                <p className="text-sm text-slate-600">Sin resultados.</p>
            )}

            {ciudades.length > 0 && (
                <ul className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1" aria-label="Resultados de ciudades">
                    {ciudades.map((resultado) => {
                        const claveCiudad = resultado.id ?? `${resultado.latitude},${resultado.longitude}`;
                        const seleccionado = Boolean(ciudadSeleccionada)
                            && (ciudadSeleccionada.id ?? `${ciudadSeleccionada.latitude},${ciudadSeleccionada.longitude}`) === claveCiudad;
                        return (
                            <li key={claveCiudad}>
                                <button
                                    type="button"
                                    aria-pressed={seleccionado}
                                    onClick={() => seleccionarCiudad(resultado)}
                                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${seleccionado ? 'bg-teal-50 font-semibold text-teal-950' : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                    {resultado.name}{resultado.admin1 ? `, ${resultado.admin1}` : ''}, {resultado.country}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

export default Formulario;