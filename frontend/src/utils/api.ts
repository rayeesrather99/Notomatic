const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

export async function generateNote(file: File, noteType: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('noteType', noteType)

  const response = await fetch(`${API_BASE_URL}/generate-note`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate note')
  }

  return response.json()
}

export async function fetchNotes() {
  const response = await fetch(`${API_BASE_URL}/notes`)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return response.json()
}

export async function updateNote(noteId: string, content: string) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to update note')
  }

  return response.json()
}

export async function deleteNote(noteId: string) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete note')
  }

  return response.json()
}