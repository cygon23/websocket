import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    
    ws.onopen = () => {
      console.log('WebSocket connection established')
      setSocket(ws)
    }
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data])
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed')
      setSocket(null)
    }
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      ws.close()
    }
  }, [])

  if(!socket) {
    return <div>Connecting...</div>
  }

  return (
    <>
     {messages}
     <input></input>
     <button
      onClick={() => {
        socket.send('')
      }}
     >
      Send
     </button>
    </>
  )
}

export default App
