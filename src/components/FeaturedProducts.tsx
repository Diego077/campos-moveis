import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Sofá Milano',
    category: 'Estofados',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Conforto e elegância em um design moderno e atemporal.'
  },
  {
    id: 2,
    name: 'Poltrona Versailles',
    category: 'Estofados',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80',
    description: 'Design exclusivo com tecido premium e acabamento sofisticado.'
  },
  {
    id: 3,
    name: 'Mesa de Jantar Veneza',
    category: 'Mesas',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Mesa robusta com design elegante para reunir família e amigos.'
  },
  {
    id: 4,
    name: 'Mesa de Centro Florença',
    category: 'Mesas',
    image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    description: 'Peça central para sua sala de estar com acabamento refinado.'
  }
];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('todos');

  const filteredProducts = activeTab === 'todos' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeTab);

  return (
    <section id="produtos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça nossa seleção exclusiva de móveis que combinam qualidade, conforto e design.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'todos'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-amber-800`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab('estofados')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'estofados'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-amber-800`}
            >
              Estofados
            </button>
            <button
              onClick={() => setActiveTab('mesas')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'mesas'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-amber-800`}
            >
              Mesas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-amber-800 text-white px-2 py-1 text-xs">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <button className="text-amber-800 font-medium hover:text-amber-700 transition-colors flex items-center">
                  Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
