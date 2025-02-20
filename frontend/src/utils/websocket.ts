import { useEffect, useRef, useState } from 'react'

export function useWebSocket(noteId: string) {
  const [messages, setMessages] = useState<string[]>([])
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // For now, we'll just simulate WebSocket behavior
    const mockSocket = {
      send: (message: string) => {
        setMessages(prev => [...prev, JSON.parse(message).message])
      },
      close: () => {}
    }

    socketRef.current = mockSocket as unknown as WebSocket

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [noteId])

  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ message }))
    }
  }

  return { messages, sendMessage }
}

