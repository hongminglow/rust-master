import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: string
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    // Fetch initial todos
    fetchTodos()

    // Setup WebSocket for time
    const socket = new WebSocket('ws://localhost:3001/ws')
    socket.onmessage = (event) => {
      setTime(event.data)
    }

    return () => socket.close()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/todos')
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      })
      if (response.ok) {
        setNewTodo('')
        fetchTodos()
      }
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
      fetchTodos()
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: 'DELETE',
      })
      fetchTodos()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div>
          <h1>Rust Learning Hub</h1>
          <p style={{ color: '#94a3b8' }}>Simple CRUD Template for Rust Beginners</p>
        </div>
        <div className="time-badge">
          {time}
        </div>
      </header>

      <section className="card">
        <form onSubmit={addTodo} className="form-group">
          <input
            type="text"
            placeholder="Add a new learning task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
              No tasks yet. Start by adding one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                    style={{ width: 'auto', cursor: 'pointer' }}
                  />
                  <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                </div>
                <div className="actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer style={{ marginTop: '4rem', color: '#475569', fontSize: '0.9rem' }}>
        <p>Built with Axum (Rust) & React (TypeScript)</p>
      </footer>
    </div>
  )
}

export default App
