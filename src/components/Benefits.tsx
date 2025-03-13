import { Clock, CreditCard, Shield, Truck } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface Benefit {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      icon: <Truck className="h-12 w-12 text-white" />,
      title: "Entrega no Mesmo Dia",
      description: "Receba seu novo sofá hoje mesmo após a confirmação da compra."
    },
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Frete Grátis",
      description: "Não cobramos pelo transporte, economize ainda mais na sua compra."
    },
    {
      icon: <Clock className="h-12 w-12 text-white" />,
      title: "Montagem Inclusa",
      description: "Nossos profissionais montam seu sofá na hora da entrega sem custo adicional."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-white" />,
      title: "Pagamento na Entrega",
      description: "Pague apenas quando receber e conferir seu produto, maior segurança para você."
    }
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Get product data from localStorage if available
    const savedProduct = localStorage.getItem('productData');
    if (savedProduct) {
      const parsedProduct = JSON.parse(savedProduct);
      if (parsedProduct.benefitsList && Array.isArray(parsedProduct.benefitsList)) {
        // Map the benefitsList to include the icons
        const iconMap = [
          <Truck className="h-12 w-12 text-white" />,
          <Shield className="h-12 w-12 text-white" />,
          <Clock className="h-12 w-12 text-white" />,
          <CreditCard className="h-12 w-12 text-white" />
        ];
        
        const updatedBenefits = parsedProduct.benefitsList.map((benefit: any, index: number) => ({
          icon: iconMap[index % iconMap.length],
          title: benefit.title,
          description: benefit.description
        }));
        
        setBenefits(updatedBenefits);
      }
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Por que escolher a Campos Móveis?
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Oferecemos uma experiência de compra completa, desde a escolha até a montagem do seu novo sofá.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`bg-blue-800 rounded-xl p-6 shadow-lg hover:bg-blue-900 transition-all transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms`, transitionDuration: '800ms' }}
            >
              <div className="bg-blue-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-3">
                {benefit.title}
              </h3>
              <p className="text-blue-100 text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className={`mt-16 bg-white rounded-xl p-6 shadow-xl transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } transition-all duration-1000`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Ainda em dúvida?</h3>
              <p className="text-gray-600">Converse agora com nossos consultores e tire todas suas dúvidas!</p>
            </div>
            <a
              href="https://wa.me/5534991483602?text=Olá! Estou com dúvidas sobre o sofá. Pode me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-green-700 transition-colors flex items-center justify-center text-lg font-medium"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.03 5.713c-.258 0-.857.039-1.398.422-.774.537-1.388 1.557-1.388 3.298 0 1.865 1.315 3.688 1.52 3.95.255.326 3.3 5.333 8.141 7.273 4.007 1.596 4.823 1.281 5.693 1.203.871-.078 2.817-1.15 3.217-2.262.398-1.111.398-2.066.28-2.266-.12-.2-.44-.319-.919-.559z" fillRule="nonzero"/>
              </svg>
              Falar com Consultor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
