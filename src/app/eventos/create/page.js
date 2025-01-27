'use client'
import { useState } from 'react';

export default function CreateEventPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titulo || !descripcion || !fecha || !ubicacion) {
      setError('Todos los campos (título, descripción, fecha, ubicación) son obligatorios.');
      return;
    }

    const currentDate = new Date();
    const eventDate = new Date(fecha);

    if (eventDate <= currentDate) {
      setError('La fecha debe ser futura.');
      return;
    }

    setError('');

    const newEvent = {
      titulo,
      descripcion,
      fecha,
      ubicacion,
      asistentes: 0,
    };

    try {
      const response = await fetch('/api/eventos/eventuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: newEvent }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.success);
        setTitulo('');
        setDescripcion('');
        setFecha('');
        setUbicacion('');
      } else {
        setError(data.error || 'Hubo un error al crear el evento.');
      }
    } catch (err) {
      setError('Error al enviar la solicitud.');
    }
  };

  return (
    <div>
      <h1>Crear un Nuevo Evento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha">Fecha del Evento:</label>
          <input
            type="datetime-local"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación:</label>
          <input
            type="text"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>

        <button type="submit">Crear Evento</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
