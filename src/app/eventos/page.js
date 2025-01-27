'use client'
import { useState, useEffect } from "react";
import Link from "next/link"

export default function ListEventos(){
    const [eventos, setEventos] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function fetchEventos() {
        try {
            const response = await fetch("/api/eventos");
            if (!response.ok) {
                throw new Error("Error al cargar los eventos");
            }
            const body = await response.json();
            setEventos(body);
        } catch (error) {
            console.error(error);
        }
    }

    async function deletePastEvents() {
        const currentDate = new Date();

        const pastEvents = eventos.filter((evento) => new Date(evento.fecha) < currentDate);

        if (pastEvents.length === 0) {
            setError('No hay eventos pasados para eliminar.');
            return;
        }

        try {
            const response = await fetch('/api/eventos/eventuser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pastEventIds: pastEvents.map((evento) => evento.id) }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.success || 'Eventos pasados eliminados con éxito.');
                fetchEventos();
            } else {
                setError(data.error || 'Error al eliminar los eventos pasados.');
            }
        } catch (err) {
            setError('Error al conectar con la API para eliminar eventos.');
        }
    }

    useEffect(() => {
        fetchEventos();
    }, []);

    return(
        <div>
            <h1>Lista de Eventos</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <button onClick={deletePastEvents}>Eliminar Eventos Pasados</button>

            {eventos.map(evento =>
                <div key={evento.id}>
                    <Link href={"eventos/"+evento.id}>
                        <p>{evento.titulo}</p>
                        <p>{evento.fecha}</p>
                    </Link>
                    <br />
                </div>
            )}
            <Link href={"./eventos/create"}>
                <p>Crear nuevo evento</p>
            </Link>
        </div>
    );
}
