import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const Formulario = () => {

    const [text, setText] = useState('');

    const data = useFetch(text)

    useEffect(() => {
        console.log("datos", data.datos)
    }, [data.datos])

    return(
        <div>
            <form className="flex flex-row p-3 w-full gap-2">
                <input type="text" className="bg-white p-1 w-full border border-red-300 rounded" 
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                />
                <button className="bg-white p-1 border rounded border-gray-400"
                onClick={(e) => {
                    e.preventDefault();
                    setText('');
                }}
                >Limpiar</button>
            </form>
        </div>
    )
}

export default Formulario;