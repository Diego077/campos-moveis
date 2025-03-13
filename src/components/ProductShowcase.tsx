import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

interface ProductData {
  title: string;
  price: string;
  description: string;
  images: string[];
  videoUrl: string;
}

const defaultProduct: ProductData = {
  title: 'Sofá Conforto Supremo',
  price: 'R$ 1.999,00',
  description: 'Sofá de 3 lugares com tecido premium, estrutura reforçada e almofadas de espuma de alta densidade. O máximo de conforto para sua sala de estar.',
  images: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

const ProductShowcase = () => {
  const [product, setProduct] = useState<ProductData>(defaultProduct);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Load product data from localStorage
  useEffect(() => {
    const savedProduct = localStorage.getItem('productData');
    if (savedProduct) {
      setProduct(JSON.parse(savedProduct));
    }
    
    // Set up intersection observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section 
      ref={sectionRef} 
      id="product-details" 
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h2>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <span className="ml-2 text-gray-600">(47 avaliações)</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-1">
                  <span className="text-4xl font-bold text-blue-800">{product.price}</span>
                  <span className="ml-3 text-lg text-gray-500 line-through">R$ 2.699,00</span>
                </div>
                <p className="text-green-600 font-medium">Economize R$ 700,00 (25% de desconto)</p>
                <p className="text-sm text-gray-600 mt-1">Em até 12x sem juros no cartão</p>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h3 className="text-xl font-semibold mb-2">Descrição do Produto</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Benefícios Exclusivos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Entrega e montagem <span className="font-medium">no mesmo dia</span></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><span className="font-medium">Frete Grátis</span> para toda a região</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Pagamento <span className="font-medium">na entrega</span> (dinheiro ou cartão)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/5534991483602?text=Olá! Estou interessado no ${product.title} que vi no anúncio. Gostaria de mais informações.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-green-700 transition-colors flex-1 text-center flex items-center justify-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.03 5.713c-.258 0-.857.039-1.398.422-.774.537-1.388 1.557-1.388 3.298 0 1.865 1.315 3.688 1.52 3.95.255.326 3.3 5.333 8.141 7.273 4.007 1.596 4.823 1.281 5.693 1.203.871-.078 2.817-1.15 3.217-2.262.398-1.111.398-2.066.28-2.266-.12-.2-.44-.319-.919-.559z" fillRule="nonzero"/>
                  </svg>
                  Comprar pelo WhatsApp
                </a>
              </div>
            </div>

            {/* Product Images */}
            <div>
              <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-w-16 aspect-h-12 mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openLightbox(currentImageIndex)}
                />
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6 text-blue-800" />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6 text-blue-800" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - Imagem ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleLightboxPrev}
          >
            <ChevronLeft className="h-6 w-6 text-blue-800" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleLightboxNext}
          >
            <ChevronRight className="h-6 w-6 text-blue-800" />
          </button>
          
          <img
            src={product.images[lightboxIndex]}
            alt={`${product.title} - Imagem ${lightboxIndex + 1}`}
            className="max-h-screen max-w-full"
          />
        </div>
      )}
    </section>
  );
};

export default ProductShowcase;
