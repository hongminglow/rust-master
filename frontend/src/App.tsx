import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Documentation from './pages/Documentation';
import Playground from './pages/Playground';

function App() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    // Setup WebSocket for time from our Rust backend
    const socket = new WebSocket('ws://localhost:3001/ws');
    socket.onmessage = (event) => {
      setTime(event.data);
    };

    return () => socket.close();
  }, []);

  return (
    <Router>
      <div className="dashboard">
        <Navbar time={time} />

        <main>
          <Routes>
            <Route path="/" element={<Documentation />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </main>

        <footer style={{ marginTop: '4rem', paddingBottom: '2rem', color: '#475569', fontSize: '0.9rem', textAlign: 'center' }}>
          <p>Rust Learning Platform &copy; {new Date().getFullYear()} — Built with Axum & React</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
