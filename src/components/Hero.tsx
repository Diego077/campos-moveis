import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [product, setProduct] = useState({
    title: 'Sofá Conforto Supremo',
    price: 'R$ 1.999,00',
    heroTitle: 'Sofá Conforto Supremo',
    heroDescription: 'Elegância e conforto para transformar sua sala de estar',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Get product data from localStorage if available
    const savedProduct = localStorage.getItem('productData');
    if (savedProduct) {
      const parsedProduct = JSON.parse(savedProduct);
      setProduct({
        title: parsedProduct.title,
        price: parsedProduct.price,
        heroTitle: parsedProduct.heroTitle || parsedProduct.title,
        heroDescription: parsedProduct.heroDescription || 'Elegância e conforto para transformar sua sala de estar',
        videoUrl: parsedProduct.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      });
    }
  }, []);

  // Prepare video URL with autoplay parameters
  const getVideoUrlWithAutoplay = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=1&muted=1`;
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`text-white space-y-6 transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="inline-block px-3 py-1 bg-blue-500 bg-opacity-30 backdrop-blur-sm rounded-full text-sm font-medium mb-1">
              Oferta Especial - Campos Móveis
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {product.heroTitle}
            </h1>
            
            {/* Video positioned prominently after title with autoplay */}
            {product.videoUrl && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={getVideoUrlWithAutoplay(product.videoUrl)}
                  title="Product Video"
                  className="w-full h-64 md:h-72"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                  loading="eager"
                ></iframe>
              </div>
            )}
            
            <p className="text-xl md:text-2xl text-blue-200">
              {product.heroDescription}
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-3xl md:text-4xl font-bold">{product.price}</span>
              <span className="text-lg line-through text-blue-300">R$ 2.699,00</span>
              <span className="px-2 py-1 bg-yellow-500 text-yellow-900 rounded-md text-sm font-bold">
                -25%
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#product-details" 
                className="inline-flex items-center bg-white text-blue-900 px-6 py-3 rounded-md shadow-lg hover:bg-blue-50 transition-colors text-lg font-medium"
              >
                Ver Detalhes
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              <a 
                href={`https://wa.me/5534991483602?text=Olá! Estou interessado no ${product.title}`}
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Comprar Agora
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.03 5.713c-.258 0-.857.039-1.398.422-.774.537-1.388 1.557-1.388 3.298 0 1.865 1.315 3.688 1.52 3.95.255.326 3.3 5.333 8.141 7.273 4.007 1.596 4.823 1.281 5.693 1.203.871-.078 2.817-1.15 3.217-2.262.398-1.111.398-2.066.28-2.266-.12-.2-.44-.319-.919-.559z" fillRule="nonzero"/>
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="flex items-center bg-blue-800 bg-opacity-40 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-blue-100 text-sm">Entrega <br/> no mesmo dia</span>
              </div>
              <div className="flex items-center bg-blue-800 bg-opacity-40 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-100 text-sm">Pagamento <br/> na entrega</span>
              </div>
              <div className="flex items-center bg-blue-800 bg-opacity-40 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-blue-100 text-sm">Frete <br/> Grátis</span>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-yellow-400 rounded-full opacity-70 blur-md animate-pulse"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-400 rounded-full opacity-70 blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Sofá Premium" 
                className="w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10"
              />
              
              <div className="absolute -right-3 top-6 transform rotate-12 bg-white text-blue-900 py-2 px-4 rounded-lg shadow-lg z-20 font-bold animate-bounce">
                Oferta Limitada!
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
