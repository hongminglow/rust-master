import { NavLink } from 'react-router-dom';
import { BookOpen, Terminal, Clock } from 'lucide-react';

interface NavbarProps {
  time: string;
}

const Navbar = ({ time }: NavbarProps) => {
  return (
    <header className="header">
      <div>
        <h1>Rust Learning Hub</h1>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            <BookOpen size={18} /> Tutorial
          </NavLink>
          <NavLink
            to="/playground"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Terminal size={18} /> Playground
          </NavLink>
        </nav>
      </div>
      <div className="time-badge">
        <Clock size={16} />
        {time}
      </div>
    </header>
  );
};

export default Navbar;
