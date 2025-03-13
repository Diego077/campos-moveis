import { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Benefits from './components/Benefits';
import SimplifiedFooter from './components/SimplifiedFooter';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

export function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    // Include required fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Raleway:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Check if user is logged in as admin
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleLogin = (success: boolean) => {
    setIsAdmin(success);
    if (success) {
      localStorage.setItem('isAdmin', 'true');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminPanel(false);
    localStorage.removeItem('isAdmin');
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  return (
    <div className="font-raleway text-gray-800">
      <Navbar 
        isAdmin={isAdmin} 
        onLogout={handleLogout} 
        onAdminPanelToggle={toggleAdminPanel}
      />
      
      {showAdminPanel && isAdmin ? (
        <AdminPanel />
      ) : isAdmin ? (
        <>
          <Hero />
          <ProductShowcase />
          <Benefits />
          <SimplifiedFooter isAdmin={isAdmin} onLogout={handleLogout} />
        </>
      ) : (
        <>
          <Hero />
          <ProductShowcase />
          <Benefits />
          <SimplifiedFooter isAdmin={isAdmin} onLogout={handleLogout} />
          <AdminLogin onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
