"use client"

import { useEffect, useState } from "react"
import { use } from "react"

export default function Evento({params}){
    const {id} = use(params)
    const [evento, setEvento] = useState([])

    const [titulo, setTitulo]=useState("")
    const [descripcion, setDescripcion]=useState("")
    const [fecha, setFecha]=useState("")
    const [ubicacion, setUbicacion]=useState("")
    const [asistentes, setAsistentes]=useState(0)
    const [nuevoAsistente, setNuevoAsistente]=useState(0)

    async function fetchEvento(){
        const url = "/api/eventos/eventuser?id=" +id
        const response = await fetch(url)
        const cont = await response.json()
        setTitulo(cont.titulo)
        setDescripcion(cont.descripcion)
        setFecha(cont.fecha)
        setUbicacion(cont.ubicacion)
        setAsistentes(cont.asistentes)

        setEvento(cont)
    }

    useEffect(() => {
        fetchEvento()
    },[])

    async function handleAsistente(e) {
        e.preventDefault();

        const response = await fetch ("/api/eventos/eventuser", {
            method: 'PUT',
            headers: {'content-Type': 'application.json'},
            body: JSON.stringify({
                id:id,
                update: {
                    asistentes : nuevoAsistente
                }
            })
        })
        fetchEvento()
    }

    return(
        <div key={evento.id}>
            <p>{evento.titulo}</p>
            <p>{evento.descripcion}</p>
            <p>{evento.fecha}</p>
            <p>{evento.ubicacion}</p>
            <p>{evento.asistentes }</p>
            <input type="number" onChange={(e)=>setNuevoAsistente(e.target.value)}/>
            <button onClick={handleAsistente}>Actualizar</button>
        </div>
    );
}