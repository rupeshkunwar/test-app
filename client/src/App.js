import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <header className="topbar">
          <div>
            <p className="eyebrow">Color Lab</p>
            <h1>Fibonacci Prism</h1>
            <p className="subtitle">Compute values with a vibrant dashboard.</p>
          </div>
          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Calculator
            </NavLink>
            <NavLink
              to="/otherpage"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Tips
            </NavLink>
          </nav>
        </header>
        <main className="content-panel">
          <Routes>
            <Route path="/" element={<Fib />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
