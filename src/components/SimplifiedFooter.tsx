import { Settings } from 'lucide-react';

interface SimplifiedFooterProps {
  isAdmin: boolean;
  onLogout: () => void;
}

const SimplifiedFooter = ({ isAdmin, onLogout }: SimplifiedFooterProps) => {
  return (
    <footer className="mt-8 py-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0">
            Campos Móveis oferece entrega e montagem no mesmo dia, frete grátis e pagamento na entrega.
            Para mais informações, entre em contato conosco.
          </p>
          
          {isAdmin ? (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Logado como admin</span>
              <button
                onClick={onLogout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              id="adminLoginButton"
              className="text-sm text-gray-500 hover:text-blue-700 flex items-center"
              onClick={() => {
                const adminLoginBtn = document.querySelector('button[aria-label="Admin Login"]');
                if (adminLoginBtn) {
                  (adminLoginBtn as HTMLButtonElement).click();
                }
              }}
            >
              <Settings className="w-4 h-4 mr-1" />
              Administração
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default SimplifiedFooter;
