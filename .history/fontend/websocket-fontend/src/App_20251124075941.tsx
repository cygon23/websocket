import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [lastmessages, setLastMessages] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    
    ws.onopen = () => {
      console.log('WebSocket connection established')
      setSocket(ws)
    }
    ws.onmessage = (event) => {
      setLastMessages((prevMessages) => [...prevMessages, event.data])
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
     {lastmessages}
     <input onChange={(e)=>{
      setMessage(e.target.value)
     }}></input>
     <button
      onClick={() => {
        socket.send(message)
      }}
     >
      Send
     </button>
    </>
  )
}

export default App
