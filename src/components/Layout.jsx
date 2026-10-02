import Formulario from './Formulario'

const Layout = () => {
    return (
        <div className="flex items-center justify-center bg-gray-50 min-h-screen">
            <main className="bg-gray-100 h-100 w-100 rounded-2xl shadow-2xl p-4">
                <h1 className="text-3xl font-bold text-gray-700">CLIMA</h1>
                <Formulario />
            </main>
            
        </div>
    );
}

export default Layout;