import Formulario from './Formulario.jsx';
import { describirClima } from '../clima.js';

function Layout({
    texto,
    setTexto,
    ciudades,
    buscando,
    errorBusqueda,
    puedeMostrarResultados,
    ciudad,
    seleccionarCiudad,
    limpiar,
    pronostico,
    resumen,
}) {
    const datos = pronostico.datos;
    const formatoDia = new Intl.DateTimeFormat('es', { weekday: 'short', timeZone: 'UTC' });
    const formatoFecha = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short', timeZone: 'UTC' });

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#ccfbf1,_transparent_48%),linear-gradient(135deg,_#f8fafc,_#fff7ed)] px-4 py-10 text-slate-800 sm:py-16">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">Pronóstico local · Open-Meteo</p>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">Clima<span className="text-orange-500">.</span></h1>
                    <p className="max-w-xl text-slate-600">Encuentra una ciudad y consulta las condiciones actuales y los próximos siete días.</p>
                </header>

                <section className="space-y-4 rounded-xl border border-white/80 bg-white/90 p-4 shadow-lg shadow-slate-900/5 sm:p-6">
                    <Formulario
                        texto={texto}
                        setTexto={setTexto}
                        ciudades={ciudades}
                        buscando={buscando}
                        error={errorBusqueda}
                        puedeMostrarResultados={puedeMostrarResultados}
                        seleccionarCiudad={seleccionarCiudad}
                        limpiar={limpiar}
                        ciudadSeleccionada={ciudad}
                    />

                    {ciudad && (
                        <section className="border-t border-slate-200 pt-5" aria-live="polite">
                            {pronostico.cargando && <p className="py-8 text-center text-slate-600" role="status">Cargando el pronóstico...</p>}
                            {pronostico.error && <p className="py-8 text-center text-red-700" role="alert">No se pudo cargar el pronóstico. Inténtalo de nuevo.</p>}
                            {datos && (
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-end justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-teal-800">{ciudad.admin1 ? `${ciudad.admin1}, ${ciudad.country}` : ciudad.country}</p>
                                            <h2 className="text-2xl font-bold text-slate-900">{ciudad.name}</h2>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-5xl font-black tracking-tight text-slate-900">{datos.current.temperature_2m}°</p>
                                            <p className="text-sm text-slate-600">{describirClima(datos.current.weather_code)}</p>
                                        </div>
                                    </div>

                                    <p className="rounded-lg bg-teal-50 px-4 py-3 text-sm text-teal-950">
                                        Viento <strong>{datos.current.wind_speed_10m} km/h</strong>
                                        <span className="mx-2 text-teal-700">·</span>
                                        {datos.current.time.replace('T', ' ')}
                                    </p>

                                    {resumen && (
                                        <p className="rounded-lg border-l-4 border-orange-400 bg-orange-50 px-4 py-3 text-sm text-slate-800">
                                            Esta semana: máxima <strong>{resumen.maxima}°C</strong>, mínima <strong>{resumen.minima}°C</strong>. El día más caluroso es el <strong>{resumen.diaCaluroso}</strong>.
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
                                        {datos.daily.time.map((fecha, indice) => (
                                            <article key={fecha} className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-3 text-center">
                                                <p className="text-xs font-semibold capitalize text-slate-600">{formatoDia.format(new Date(`${fecha}T12:00:00Z`))}</p>
                                                <p className="mt-1 text-[11px] text-slate-500">{formatoFecha.format(new Date(`${fecha}T12:00:00Z`))}</p>
                                                <p className="my-2 text-xl" aria-label={describirClima(datos.daily.weather_code[indice])}>{describirClima(datos.daily.weather_code[indice]).split(' ')[0]}</p>
                                                <p className="text-xs font-bold text-slate-800">{Math.round(datos.daily.temperature_2m_max[indice])}°</p>
                                                <p className="text-xs text-slate-500">{Math.round(datos.daily.temperature_2m_min[indice])}°</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}
                </section>
                <footer className="text-center text-xs text-slate-500">Datos meteorológicos de Open-Meteo</footer>
            </div>
        </main>
    );
}

export default Layout;