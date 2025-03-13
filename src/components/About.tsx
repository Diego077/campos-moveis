const About = () => {
  return (
    <section id="sobre" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
              alt="Artesão trabalhando em móvel" 
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
              Nossa História
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Há mais de 20 anos, a Elegância Móveis combina tradição artesanal e design contemporâneo para criar peças exclusivas que transformam ambientes.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Nossa paixão por madeiras selecionadas e materiais de alta qualidade resulta em móveis que duram gerações e contam histórias.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Cada peça que produzimos reflete nossa dedicação ao conforto, funcionalidade e beleza atemporal.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-amber-800 font-bold text-3xl mb-1">20+</p>
                <p className="text-gray-700">Anos de Experiência</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-amber-800 font-bold text-3xl mb-1">500+</p>
                <p className="text-gray-700">Projetos Entregues</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-amber-800 font-bold text-3xl mb-1">98%</p>
                <p className="text-gray-700">Clientes Satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
