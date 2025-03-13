import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-amber-600 mb-4">Elegância Móveis</h3>
            <p className="text-gray-400 mb-4">
              Transformando casas em lares com móveis de qualidade e design sofisticado desde 2003.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-400 hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#produtos" className="text-gray-400 hover:text-white transition-colors">Produtos</a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-white transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Sofás</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Poltronas</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Mesas de Jantar</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Mesas de Centro</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Móveis Sob Medida</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Inscreva-se para receber novidades, tendências e promoções exclusivas.
            </p>
            <form className="mb-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-amber-800 text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">
              Ao se inscrever, você concorda com nossa política de privacidade.
            </p>
          </div>
        </div>
        
        <hr className="my-8 border-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Elegância Móveis. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
