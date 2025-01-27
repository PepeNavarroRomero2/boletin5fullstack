import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjcwjhszfnocrkvwumnh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3dqaHN6Zm5vY3Jrdnd1bW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODgxNTksImV4cCI6MjA1Mjk2NDE1OX0.Ob2eeJk5wlO8tUjmkvx9N6aB1cIPcsuKiJoMa2Jwuk8"
const supabase = createClient(supabaseUrl, supabaseKey)


export async function GET(request){
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const {data: contact, error} = await supabase.from("eventos").select("*").eq("id",id).single()

return new Response(JSON.stringify(contact), {status: 200})
}

export async function PUT(request){
    const body = await request.json()
    const id = body.id
    const {data: updateData, error} = await supabase.from("eventos").update(body.update).eq("id",id)
    return new Response(JSON.stringify({success: "actualizado"},{status:200}))
    }

    export async function POST(request) {
        const body = await request.json();
        const contacto = body.contact;
    
        if (!contacto.titulo || !contacto.descripcion || !contacto.fecha || !contacto.ubicacion) {
            return new Response(
                JSON.stringify({ error: "Todos los campos (título, descripción, fecha, ubicación) son obligatorios." }),
                { status: 400 }
            );
        }
    
        const currentDate = new Date();
        const eventDate = new Date(contacto.fecha);
        if (eventDate <= currentDate) {
            return new Response(
                JSON.stringify({ error: "La fecha debe ser futura." }),
                { status: 400 }
            );
        }
    
        const { data: postData, error } = await supabase.from("eventos").insert([contacto]);
    
        if (error) {
            return new Response(
                JSON.stringify({ error: error.message }),
                { status: 400 }
            );
        }
    
        return new Response(
            JSON.stringify({ success: "Evento creado con éxito" }),
            { status: 201 }
        );
    }

    export async function DELETE(request) {
        const body = await request.json();
        const pastEventIds = body.pastEventIds;
      
        if (!pastEventIds || pastEventIds.length === 0) {
          return new Response(JSON.stringify({ error: 'No se proporcionaron eventos para eliminar.' }), { status: 400 });
        }
      
        const { error } = await supabase
          .from('eventos')
          .delete()
          .in('id', pastEventIds);
      
        if (!error) {
          return new Response(JSON.stringify({ success: 'Eventos pasados eliminados con éxito.' }), { status: 200 });
        }
      
        return new Response(JSON.stringify({ error: 'Error al eliminar los eventos pasados.' }), { status: 500 });
      }