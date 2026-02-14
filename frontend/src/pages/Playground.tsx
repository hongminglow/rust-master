import { useState, useEffect } from 'react';
import { Send, Trash2, CheckCircle2, Circle, Terminal } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const Playground = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      if (response.ok) {
        setNewTodo('');
        fetchTodos();
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="playground">
      <section className="card">
        <div style={{ marginBottom: '2rem' }}>
          <h2>Rust API Playground</h2>
          <p style={{ color: '#64748b' }}>
            Testing the <code>RwLock</code> implementation in real-time.
          </p>
        </div>

        <form onSubmit={addTodo} className="form-group">
          <input
            type="text"
            placeholder="Send data to Rust backend..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : <><Send size={18} /> Send</>}
          </button>
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem' }}>
              <Terminal size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>The Rust <code>Vec</code> is currently empty.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <div
                    className="todo-checkbox-wrapper"
                    onClick={() => toggleTodo(todo.id, todo.completed)}
                    style={{ color: todo.completed ? '#34d399' : '#94a3b8' }}
                  >
                    {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </div>
                  <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                </div>
                <div className="actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="card" style={{ borderStyle: 'dashed', borderColor: 'rgba(96, 165, 250, 0.2)' }}>
        <h3 style={{ color: '#60a5fa', marginBottom: '1rem' }}>Backend Logic Check</h3>
        <p className="tutorial-content" style={{ fontSize: '0.9rem' }}>
          Every time you add or delete a task, the Rust backend executes a <code>.write().unwrap()</code> lock on the <code>RwLock</code>. This prevents memory corruption if multiple people were using this dashboard simultaneously.
        </p>
      </section>
    </div>
  );
};

export default Playground;
