import { useState, useEffect } from 'react';
import { DollarSign, FileText, Film, Globe, Image, Mail, Palette, Phone, Settings, Upload, X } from 'lucide-react';

interface ProductData {
  title: string;
  price: string;
  description: string;
  images: string[];
  videoUrl: string;
  heroTitle?: string;
  heroDescription?: string;
  benefitsList?: {
    title: string;
    description: string;
  }[];
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
  };
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

const defaultProduct: ProductData = {
  title: 'Sofá Conforto Supremo',
  price: 'R$ 1.999,00',
  description: 'Sofá de 3 lugares com tecido premium, estrutura reforçada e almofadas de espuma de alta densidade. O máximo de conforto para sua sala de estar.',
  images: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  heroTitle: 'Sofá Conforto Supremo',
  heroDescription: 'Elegância e conforto para transformar sua sala de estar',
  benefitsList: [
    {
      title: "Entrega no Mesmo Dia",
      description: "Receba seu novo sofá hoje mesmo após a confirmação da compra."
    },
    {
      title: "Frete Grátis",
      description: "Não cobramos pelo transporte, economize ainda mais na sua compra."
    },
    {
      title: "Montagem Inclusa",
      description: "Nossos profissionais montam seu sofá na hora da entrega sem custo adicional."
    },
    {
      title: "Pagamento na Entrega",
      description: "Pague apenas quando receber e conferir seu produto, maior segurança para você."
    }
  ],
  contactInfo: {
    phone: "(34) 99148-3602",
    email: "contato@camposmoveis.com.br",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
  }
};

const defaultTheme: ThemeSettings = {
  primaryColor: "#1e40af", // blue-700
  secondaryColor: "#1e3a8a", // blue-900
  accentColor: "#eab308", // yellow-500
  textColor: "#ffffff", // white
  backgroundColor: "#ffffff", // white
};

const colorOptions = {
  blue: {
    primary: "#1e40af", // blue-700
    secondary: "#1e3a8a", // blue-900
  },
  green: {
    primary: "#15803d", // green-700
    secondary: "#14532d", // green-900
  },
  red: {
    primary: "#b91c1c", // red-700
    secondary: "#7f1d1d", // red-900
  },
  purple: {
    primary: "#7e22ce", // purple-700
    secondary: "#581c87", // purple-900
  },
  amber: {
    primary: "#b45309", // amber-700
    secondary: "#78350f", // amber-900
  },
  teal: {
    primary: "#0f766e", // teal-700
    secondary: "#134e4a", // teal-900
  },
  gray: {
    primary: "#374151", // gray-700
    secondary: "#111827", // gray-900
  },
  indigo: {
    primary: "#4338ca", // indigo-700
    secondary: "#312e81", // indigo-900
  }
};

const accentOptions = {
  yellow: "#eab308", // yellow-500
  emerald: "#10b981", // emerald-500
  rose: "#f43f5e", // rose-500
  orange: "#f97316", // orange-500
  sky: "#0ea5e9", // sky-500
  violet: "#8b5cf6", // violet-500
  pink: "#ec4899", // pink-500
  lime: "#84cc16", // lime-500
};

const textColorOptions = {
  white: "#ffffff",
  lightGray: "#f3f4f6",
  darkGray: "#111827",
  black: "#000000"
};

const AdminPanel = () => {
  const [product, setProduct] = useState<ProductData>(() => {
    const savedProduct = localStorage.getItem('productData');
    return savedProduct ? JSON.parse(savedProduct) : defaultProduct;
  });
  
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('themeSettings');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });
  
  const [newImage, setNewImage] = useState('');
  const [activeTab, setActiveTab] = useState('images');
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('productData', JSON.stringify(product));
  }, [product]);

  useEffect(() => {
    // Apply theme to CSS variables
    applyThemeToDocument(theme);
    
    // Save theme to localStorage
    localStorage.setItem('themeSettings', JSON.stringify(theme));
    
    // Dispatch custom event to notify components about theme changes
    window.dispatchEvent(new Event('themeChanged'));
  }, [theme]);

  const applyThemeToDocument = (themeSettings: ThemeSettings) => {
    document.documentElement.style.setProperty('--primary-color', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', themeSettings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', themeSettings.accentColor);
    document.documentElement.style.setProperty('--text-primary', themeSettings.textColor);
    document.documentElement.style.setProperty('--background-color', themeSettings.backgroundColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactInfoChange = (field: keyof typeof product.contactInfo, value: string) => {
    setProduct(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleBenefitChange = (index: number, field: 'title' | 'description', value: string) => {
    if (!product.benefitsList) return;
    
    const updatedBenefits = [...product.benefitsList];
    updatedBenefits[index] = {
      ...updatedBenefits[index],
      [field]: value
    };

    setProduct(prev => ({
      ...prev,
      benefitsList: updatedBenefits
    }));
  };

  const changeThemeColor = (colorType: keyof ThemeSettings, value: string) => {
    setTheme(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  // This will apply a complete preset theme
  const applyColorScheme = (primaryColor: string, secondaryColor: string) => {
    setTheme(prev => ({
      ...prev,
      primaryColor,
      secondaryColor
    }));
  };

  // Function to apply a complete theme (primary, secondary, text)
  const applyCompleteTheme = (primaryColor: string, secondaryColor: string, textColor: string) => {
    setTheme(prev => ({
      ...prev,
      primaryColor,
      secondaryColor,
      textColor
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6" style={{backgroundColor: theme.primaryColor, color: theme.textColor}}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Painel de Administração - Campos Móveis</h2>
              <p className="mt-1 opacity-80">Gerencie o conteúdo do seu site</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreviewMode(!previewMode)} 
                className="px-4 py-2 rounded-md hover:opacity-90 transition-colors flex items-center"
                style={{backgroundColor: theme.textColor, color: theme.primaryColor}}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {previewMode ? 'Voltar ao Editor' : 'Modo Prévia'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex flex-wrap space-x-4 md:space-x-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <button
                onClick={() => setActiveTab('images')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'images'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'images' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <Image className="w-5 h-5 mr-2" />
                  Imagens
                </div>
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'video'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'video' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <Film className="w-5 h-5 mr-2" />
                  Vídeo
                </div>
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'details'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'details' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Detalhes do Produto
                </div>
              </button>
              <button
                onClick={() => setActiveTab('price')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'price'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'price' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Preço
                </div>
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'hero'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'hero' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Banner Principal
                </div>
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'benefits'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'benefits' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Benefícios
                </div>
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'theme'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'theme' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Tema
                </div>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'contact'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'contact' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contato
                </div>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-4 px-1 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === 'settings' ? {borderColor: theme.primaryColor, color: theme.primaryColor} : {}}
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações Gerais
                </div>
              </button>
            </nav>
          </div>

          {activeTab === 'images' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gerenciar Imagens</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Nova Imagem (URL)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={addImage}
                    className="text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-colors flex items-center"
                    style={{backgroundColor: theme.primaryColor}}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {product.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Produto ${index + 1}`}
                      className="h-48 w-full object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remover imagem"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">URL do Vídeo</h3>
              <div className="mb-4">
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Link do Vídeo (YouTube embed URL)
                </label>
                <input
                  type="text"
                  id="videoUrl"
                  name="videoUrl"
                  value={product.videoUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>
              
              {product.videoUrl && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Prévia:</h4>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={product.videoUrl}
                      title="Product Video"
                      className="w-full h-64 rounded-md border border-gray-300"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Detalhes do Produto</h3>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Produto
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={product.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          )}

          {activeTab === 'price' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preço do Produto</h3>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Preço
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Banner Principal</h3>
              
              <div className="mb-4">
                <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Banner
                </label>
                <input
                  type="text"
                  id="heroTitle"
                  name="heroTitle"
                  value={product.heroTitle || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Banner
                </label>
                <input
                  type="text"
                  id="heroDescription"
                  name="heroDescription"
                  value={product.heroDescription || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Benefícios</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione o benefício para editar
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {product.benefitsList?.map((benefit, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBenefitIndex(index)}
                      className={`p-2 text-sm rounded ${
                        currentBenefitIndex === index
                          ? 'border-blue-500 border'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      style={
                        currentBenefitIndex === index 
                          ? { 
                              backgroundColor: `${theme.primaryColor}20`, 
                              borderColor: theme.primaryColor,
                              color: theme.primaryColor
                            }
                          : {}
                      }
                    >
                      {benefit.title || `Benefício ${index + 1}`}
                    </button>
                  ))}
                </div>
                
                {product.benefitsList && product.benefitsList[currentBenefitIndex] && (
                  <div className="p-4 border border-gray-300 rounded-md">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título do Benefício
                      </label>
                      <input
                        type="text"
                        value={product.benefitsList[currentBenefitIndex].title}
                        onChange={(e) => handleBenefitChange(currentBenefitIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição do Benefício
                      </label>
                      <textarea
                        value={product.benefitsList[currentBenefitIndex].description}
                        onChange={(e) => handleBenefitChange(currentBenefitIndex, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personalização do Tema</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">Tema Completo do Site</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Escolha um dos temas pré-definidos abaixo para aplicar em todo o site (cabeçalho, corpo e botões).
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(colorOptions).map(([colorName, colors]) => (
                      <div key={colorName} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-4 flex flex-col gap-2">
                          {/* Theme preview */}
                          <div className="flex flex-col gap-1">
                            <div style={{ backgroundColor: colors.primary, height: "24px" }} className="rounded-t-sm"></div>
                            <div style={{ backgroundColor: colors.secondary, height: "40px" }} className="flex justify-center items-center">
                              <span style={{ color: "#ffffff" }} className="text-xs font-medium">Cabeçalho</span>
                            </div>
                            <div style={{ backgroundColor: "#ffffff", height: "40px", border: "1px solid #e5e7eb" }} className="flex justify-center items-center">
                              <span style={{ color: colors.primary }} className="text-xs font-medium">Conteúdo</span>
                            </div>
                          </div>
                          
                          {/* Theme name and apply button */}
                          <div className="mt-2 text-center">
                            <p className="text-sm font-medium capitalize mb-2">{colorName}</p>
                            <button
                              onClick={() => applyCompleteTheme(colors.primary, colors.secondary, "#ffffff")}
                              className="text-xs px-3 py-1.5 rounded w-full"
                              style={{ backgroundColor: colors.primary, color: "#ffffff" }}
                            >
                              Aplicar Tema
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">Cores Primárias</h4>
                  <div className="p-4 border rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor Principal (Cabeçalho, Botões)
                      </label>
                      <div className="flex">
                        <input
                          type="color"
                          value={theme.primaryColor}
                          onChange={(e) => changeThemeColor('primaryColor', e.target.value)}
                          className="h-10 w-10 border rounded-l"
                        />
                        <input
                          type="text"
                          value={theme.primaryColor}
                          onChange={(e) => changeThemeColor('primaryColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-l-0 rounded-r-md"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor Secundária (Gradientes, Fundos)
                      </label>
                      <div className="flex">
                        <input
                          type="color"
                          value={theme.secondaryColor}
                          onChange={(e) => changeThemeColor('secondaryColor', e.target.value)}
                          className="h-10 w-10 border rounded-l"
                        />
                        <input
                          type="text"
                          value={theme.secondaryColor}
                          onChange={(e) => changeThemeColor('secondaryColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-l-0 rounded-r-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor do Texto no Cabeçalho
                      </label>
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        {Object.entries(textColorOptions).map(([name, color]) => (
                          <button
                            key={name}
                            onClick={() => changeThemeColor('textColor', color)}
                            className={`w-full p-2 h-10 rounded-md flex justify-center items-center transition-all ${
                              theme.textColor === color
                                ? 'ring-2 ring-offset-2 ring-gray-400'
                                : ''
                            }`}
                            style={{ backgroundColor: color, border: '1px solid #e5e7eb', color: color === '#ffffff' || color === '#f3f4f6' ? '#000000' : '#ffffff' }}
                          >
                            <span>{name}</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="color"
                          value={theme.textColor}
                          onChange={(e) => changeThemeColor('textColor', e.target.value)}
                          className="h-10 w-10 border rounded-l"
                        />
                        <input
                          type="text"
                          value={theme.textColor}
                          onChange={(e) => changeThemeColor('textColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-l-0 rounded-r-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">Cores de Destaque</h4>
                  <div className="p-4 border rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor de Destaque (Elementos de Atenção)
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {Object.entries(accentOptions).map(([name, color]) => (
                        <button
                          key={name}
                          onClick={() => changeThemeColor('accentColor', color)}
                          className={`w-full p-2 h-10 rounded-md flex justify-center items-center transition-all ${
                            theme.accentColor === color
                              ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                              : ''
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {theme.accentColor === color && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => changeThemeColor('accentColor', e.target.value)}
                        className="h-10 w-10 border rounded-l"
                      />
                      <input
                        type="text"
                        value={theme.accentColor}
                        onChange={(e) => changeThemeColor('accentColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-l-0 rounded-r-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Prévia do Site</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4" style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}>
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold">Campos Móveis</h5>
                        <div className="flex space-x-4">
                          <span style={{ color: theme.textColor }}>Início</span>
                          <span style={{ color: theme.textColor }}>Detalhes</span>
                          <span style={{ 
                            backgroundColor: theme.textColor, 
                            color: theme.primaryColor,
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>Solicitar</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="font-bold text-xl mb-2">Corpo da Página</h3>
                      <p className="text-gray-600 mb-4">Esta é a aparência do conteúdo principal do seu site.</p>
                      <div className="flex space-x-3">
                        <button 
                          className="px-4 py-2 rounded-md text-white"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          Botão Principal
                        </button>
                        <button 
                          className="px-4 py-2 rounded-md text-white"
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          Botão de Destaque
                        </button>
                      </div>
                    </div>
                    <div className="p-4" style={{ backgroundColor: theme.secondaryColor, color: theme.textColor }}>
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold">Rodapé</h5>
                        <div className="text-sm opacity-80">© 2023 Campos Móveis</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações de Contato</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="flex">
                    <div className="flex-none p-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      <Phone className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={product.contactInfo?.phone || ''}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <div className="flex">
                    <div className="flex-none p-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={product.contactInfo?.email || ''}
                      onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="contato@exemplo.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço
                  </label>
                  <div className="flex">
                    <div className="flex-none p-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      <Globe className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={product.contactInfo?.address || ''}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Rua Exemplo, 123 - Cidade/UF"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-3">Prévia</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-600 mr-2 mt-1" />
                    <div>
                      <h5 className="font-medium">Telefone</h5>
                      <p className="text-gray-700">{product.contactInfo?.phone || '(Não configurado)'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-600 mr-2 mt-1" />
                    <div>
                      <h5 className="font-medium">E-mail</h5>
                      <p className="text-gray-700">{product.contactInfo?.email || '(Não configurado)'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-gray-600 mr-2 mt-1" />
                    <div>
                      <h5 className="font-medium">Endereço</h5>
                      <p className="text-gray-700">{product.contactInfo?.address || '(Não configurado)'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações Gerais</h3>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-yellow-700 text-sm">
                    Esta área está em desenvolvimento. Novas opções de configuração serão adicionadas em breve.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">Exportação e Backup</h4>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                      Exporte todas as suas configurações para fazer um backup ou transferir para outro site.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          const data = {
                            productData: JSON.parse(localStorage.getItem('productData') || '{}'),
                            themeSettings: JSON.parse(localStorage.getItem('themeSettings') || '{}')
                          };
                          
                          const dataStr = JSON.stringify(data, null, 2);
                          const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                          
                          const exportFileDefaultName = 'campos-moveis-config.json';
                          
                          const linkElement = document.createElement('a');
                          linkElement.setAttribute('href', dataUri);
                          linkElement.setAttribute('download', exportFileDefaultName);
                          linkElement.click();
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Exportar Configurações
                      </button>
                      
                      <label className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                        Importar Configurações
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              try {
                                const result = e.target?.result;
                                if (typeof result === 'string') {
                                  const data = JSON.parse(result);
                                  
                                  if (data.productData) {
                                    localStorage.setItem('productData', JSON.stringify(data.productData));
                                    setProduct(data.productData);
                                  }
                                  
                                  if (data.themeSettings) {
                                    localStorage.setItem('themeSettings', JSON.stringify(data.themeSettings));
                                    setTheme(data.themeSettings);
                                  }
                                  
                                  alert('Configurações importadas com sucesso!');
                                }
                              } catch (error) {
                                alert('Erro ao importar configurações. Verifique o formato do arquivo.');
                              }
                            };
                            reader.readAsText(file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">Restaurar Padrões</h4>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                      Restaure todas as configurações para os valores padrão. Esta ação não pode ser desfeita.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja restaurar todas as configurações para os valores padrão? Esta ação não pode ser desfeita.')) {
                          setProduct(defaultProduct);
                          setTheme(defaultTheme);
                          localStorage.setItem('productData', JSON.stringify(defaultProduct));
                          localStorage.setItem('themeSettings', JSON.stringify(defaultTheme));
                          alert('Configurações restauradas com sucesso!');
                        }
                      }}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Restaurar Configurações Padrão
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
