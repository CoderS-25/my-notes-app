import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function NotesPage() {
  const { data: notes } = await supabase.from('notes').select('*')

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1>🚀 Live Supabase Notes</h1>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        {notes?.length === 0 ? (
          <p>No notes found. Add one in the Supabase SQL editor!</p>
        ) : (
          <ul>
            {notes?.map((n) => (
              <li key={n.id} style={{ marginBottom: '10px' }}>
                {n.content} <br/>
                <small style={{ color: 'gray' }}>{new Date(n.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
