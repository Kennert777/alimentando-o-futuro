import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop',
            title: 'Cultive Seu Próprio Alimento',
            subtitle: 'Aprenda técnicas sustentáveis de agricultura urbana'
        },
        {
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop',
            title: 'Alimentação Saudável',
            subtitle: 'Descubra receitas nutritivas e sustentáveis'
        },
        {
            image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop',
            title: 'Comunidade Sustentável',
            subtitle: 'Conecte-se com outros cultivadores urbanos'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
      <>
        {/* Hero Section */}
        <div className="position-relative" style={{ height: '70vh', minHeight: '500px' }}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`position-absolute w-100 h-100 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(36, 88, 41, 0.7), rgba(76, 175, 80, 0.6)), url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'opacity 1s ease-in-out'
                    }}
                >
                    <div className="d-flex align-items-center justify-content-center h-100 text-center text-white">
                        <div className="container">
                            <h1 className="display-4 fw-bold text-white mb-4" style={{ fontFamily: 'Playfair Display' }}>
                                Seja bem-vindo ao Alimentando o Futuro
                            </h1>
                            <h2 className="h2 mb-3" style={{ fontFamily: 'Playfair Display' }}>
                                {slide.title}
                            </h2>
                            <p className="lead mb-4" style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>
                                {slide.subtitle}
                            </p>
                            <Link 
                                to="/sobre" 
                                className="btn btn-light btn-lg px-4"
                                style={{ borderRadius: '25px', fontFamily: 'Playfair Display' }}
                            >
                                Comece Agora
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Indicadores */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
                <div className="d-flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`btn btn-sm rounded-circle ${
                                index === currentSlide ? 'btn-light' : 'btn-outline-light'
                            }`}
                            style={{ width: '12px', height: '12px' }}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
        
        {/* Seção de Funcionalidades */}
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="h2 mb-3" style={{ color: '#245829', fontFamily: 'Playfair Display' }}>Explore Nossas Funcionalidades</h2>
            <p className="lead text-muted" style={{ fontFamily: 'Cormorant Garamond' }}>Descubra todas as ferramentas para sua jornada sustentável</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&h=80&fit=crop" 
                      alt="Horta Digital" 
                      className="rounded-circle shadow-sm"
                      width="80" height="80"
                    />
                  </div>
                  <h5 className="card-title mb-3" style={{ fontFamily: 'Playfair Display', color: '#245829' }}>Horta Digital</h5>
                  <p className="card-text mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
                    Aprenda a cultivar seus próprios alimentos com guias práticos e sustentáveis
                  </p>
                  <Link to="/horta" className="btn btn-success" style={{ borderRadius: '20px', fontFamily: 'Playfair Display' }}>
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&h=80&fit=crop" 
                      alt="Receitas" 
                      className="rounded-circle shadow-sm"
                      width="80" height="80"
                    />
                  </div>
                  <h5 className="card-title mb-3" style={{ fontFamily: 'Playfair Display', color: '#245829' }}>Receitas</h5>
                  <p className="card-text mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
                    Descubra receitas sustentáveis que aproveitam cascas e talos
                  </p>
                  <Link to="/receitas" className="btn btn-success" style={{ borderRadius: '20px', fontFamily: 'Playfair Display' }}>
                    Ver Receitas
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&h=80&fit=crop" 
                      alt="Suporte" 
                      className="rounded-circle shadow-sm"
                      width="80" height="80"
                    />
                  </div>
                  <h5 className="card-title mb-3" style={{ fontFamily: 'Playfair Display', color: '#245829' }}>Suporte</h5>
                  <p className="card-text mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
                    Precisa de ajuda? Nossa equipe está pronta para te apoiar
                  </p>
                  <Link to="/apoio" className="btn btn-success" style={{ borderRadius: '20px', fontFamily: 'Playfair Display' }}>
                    Solicitar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="container py-5">
          <div className="card p-5 text-center" style={{ background: 'linear-gradient(135deg, #f0f9f0, #e8f5e8)', borderRadius: '20px', border: 'none' }}>
            <h3 className="h3 mb-4" style={{ color: '#245829', fontFamily: 'Playfair Display' }}>
              Comece Sua Jornada Sustentável!
            </h3>
            <p className="lead mb-4" style={{ fontFamily: 'Cormorant Garamond' }}>
              Junte-se a milhares de pessoas que já transformaram sua alimentação
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/horta" className="btn btn-success btn-lg" style={{ borderRadius: '25px', fontFamily: 'Playfair Display' }}>
                Criar Horta
              </Link>
              <Link to="/receitas" className="btn btn-outline-success btn-lg" style={{ borderRadius: '25px', fontFamily: 'Playfair Display' }}>
                Ver Receitas
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  