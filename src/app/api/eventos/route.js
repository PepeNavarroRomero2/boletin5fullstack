import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjcwjhszfnocrkvwumnh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3dqaHN6Zm5vY3Jrdnd1bW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODgxNTksImV4cCI6MjA1Mjk2NDE1OX0.Ob2eeJk5wlO8tUjmkvx9N6aB1cIPcsuKiJoMa2Jwuk8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){

    const{data: eventos, error} = await supabase
    .from('eventos')
    .select('*')
    .order("fecha",{ascending: true})
    
    return new Response(JSON.stringify(eventos), {status:200})
}