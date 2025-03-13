import { useState, useEffect } from 'react';
import { Menu, Settings, X } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  onAdminPanelToggle: () => void;
}

const Navbar = ({ isAdmin, onLogout, onAdminPanelToggle }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#1e40af",
    secondaryColor: "#1e3a8a",
    accentColor: "#eab308",
    textColor: "#ffffff"
  });

  // Listen for theme changes in localStorage
  useEffect(() => {
    const loadTheme = () => {
      const savedTheme = localStorage.getItem('themeSettings');
      if (savedTheme) {
        setThemeSettings(JSON.parse(savedTheme));
      }
    };

    // Load initial theme
    loadTheme();
    
    // Setup event listener for theme changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'themeSettings') {
        loadTheme();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleThemeChange = () => loadTheme();
    window.addEventListener('themeChanged', handleThemeChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  return (
    <nav style={{ 
      backgroundColor: themeSettings.primaryColor,
      color: themeSettings.textColor
    }} className="shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="font-playfair text-2xl font-bold" style={{ color: themeSettings.textColor }}>Campos Móveis</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="hover:opacity-80 transition-opacity" style={{ color: themeSettings.textColor }}>Início</a>
            <a href="#product-details" className="hover:opacity-80 transition-opacity" style={{ color: themeSettings.textColor }}>Detalhes</a>
            <button 
              className="px-4 py-2 rounded hover:opacity-90 transition-opacity" 
              style={{ 
                backgroundColor: themeSettings.textColor, 
                color: themeSettings.primaryColor 
              }}
            >
              Solicitar Orçamento
            </button>
            
            {isAdmin && (
              <div className="relative ml-3">
                <button
                  onClick={onAdminPanelToggle}
                  className="p-2 rounded-full hover:opacity-90 transition-opacity"
                  style={{ 
                    backgroundColor: themeSettings.textColor, 
                    color: themeSettings.primaryColor 
                  }}
                  title="Painel Admin"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            )}
            
            {isAdmin && (
              <button
                onClick={onLogout}
                className="hover:text-red-300 transition-colors"
                style={{ color: themeSettings.textColor }}
              >
                Sair
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAdmin && (
              <>
                <button
                  onClick={onAdminPanelToggle}
                  className="mr-2 p-2 rounded-full hover:opacity-90 transition-opacity"
                  style={{ 
                    backgroundColor: themeSettings.textColor, 
                    color: themeSettings.primaryColor 
                  }}
                  title="Painel Admin"
                >
                  <Settings className="h-5 w-5" />
                </button>
                
                <button
                  onClick={onLogout}
                  className="mr-2 hover:text-red-300 transition-colors"
                  style={{ color: themeSettings.textColor }}
                >
                  Sair
                </button>
              </>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:opacity-80 focus:outline-none"
              style={{ color: themeSettings.textColor }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg" style={{ 
            backgroundColor: `color-mix(in srgb, ${themeSettings.primaryColor}, black 10%)`,
            color: themeSettings.textColor
          }}>
            <a
              href="#inicio"
              className="block px-3 py-2 hover:opacity-80 transition-opacity"
              style={{ color: themeSettings.textColor }}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </a>
            <a
              href="#product-details"
              className="block px-3 py-2 hover:opacity-80 transition-opacity"
              style={{ color: themeSettings.textColor }}
              onClick={() => setIsMenuOpen(false)}
            >
              Detalhes
            </a>
            <button 
              className="w-full mt-2 text-left px-3 py-2 rounded hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: themeSettings.textColor, 
                color: themeSettings.primaryColor 
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
