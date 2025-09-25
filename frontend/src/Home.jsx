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
        {/* Carrossel Hero */}
        <div className="position-relative overflow-hidden" style={{ height: '70vh' }}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`position-absolute w-100 h-100 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(79, 115, 44, 0.7), rgba(85, 140, 3, 0.7)), url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'opacity 1s ease-in-out'
                    }}
                >
                    <div className="d-flex align-items-center justify-content-center h-100 text-center text-white">
                        <div className="container">
                            <h1 className="display-2 fw-bold mb-4 animate__animated animate__fadeInUp luxury-text">
                                Seja bem-vindo ao Alimentando o Futuro
                            </h1>
                            <h2 className="display-5 mb-4 animate__animated animate__fadeInUp animate__delay-1s elegant-text">
                                {slide.title}
                            </h2>
                            <p className="lead mb-5 animate__animated animate__fadeInUp animate__delay-2s" style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
                                {slide.subtitle}
                            </p>
                            <Link 
                                to="/sobre" 
                                className="btn btn-light btn-lg px-5 py-3 animate__animated animate__fadeInUp animate__delay-3s"
                                style={{ borderRadius: '50px' }}
                            >
                                Comece Agora
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Indicadores do carrossel */}
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
          <h2 className="text-center mb-5 display-4 gradient-text luxury-text">Explore Nossas Funcionalidades</h2>
          
          {/* Grid responsivo com 3 colunas */}
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 glassmorphism luxury-shadow fade-in-up" style={{ backgroundColor: "rgba(217, 193, 121, 0.1)" }}>
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop" 
                         alt="Horta Digital" className="rounded-circle luxury-shadow" width="100" height="100" />
                  </div>
                  <h5 className="card-title luxury-text">Horta Digital</h5>
                  <p className="card-text elegant-text">Aprenda a cultivar seus próprios alimentos com guias práticos e sustentáveis</p>
                  <Link to="/horta" className="btn btn-primary">Explorar</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 glassmorphism luxury-shadow fade-in-up" style={{ backgroundColor: "rgba(217, 174, 137, 0.1)", animationDelay: '0.2s' }}>
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" 
                         alt="Receitas" className="rounded-circle luxury-shadow" width="100" height="100" />
                  </div>
                  <h5 className="card-title luxury-text">Receitas</h5>
                  <p className="card-text elegant-text">Descubra receitas sustentáveis que aproveitam cascas e talos</p>
                  <Link to="/receitas" className="btn btn-success">Ver Receitas</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 glassmorphism luxury-shadow fade-in-up" style={{ backgroundColor: "rgba(174, 191, 44, 0.1)", animationDelay: '0.4s' }}>
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=100&h=100&fit=crop" 
                         alt="Suporte" className="rounded-circle luxury-shadow" width="100" height="100" />
                  </div>
                  <h5 className="card-title luxury-text">Suporte</h5>
                  <p className="card-text elegant-text">Precisa de ajuda? Nossa equipe está pronta para te apoiar</p>
                  <Link to="/apoio" className="btn btn-primary">Solicitar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção Call to Action */}
        <div className="container py-5">
          <div className="card border-0 glassmorphism luxury-shadow" style={{ 
            background: 'linear-gradient(135deg, rgba(79, 115, 44, 0.9) 0%, rgba(85, 140, 3, 0.8) 100%)', 
            color: 'white',
            backdropFilter: 'blur(20px)'
          }}>
            <div className="card-body text-center py-5">
              <h3 className="display-4 luxury-text mb-4" style={{ color: 'white' }}>Comece Sua Jornada Sustentável!</h3>
              <p className="lead mb-5 elegant-text" style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>Junte-se a milhares de pessoas que já transformaram sua alimentação</p>
              
              <div className="d-flex flex-column flex-md-row gap-4 justify-content-center">
                <Link to="/horta" className="btn btn-light btn-lg px-5 py-3">
                  Criar Horta
                </Link>
                <Link to="/receitas" className="btn btn-outline-light btn-lg px-5 py-3">
                  Ver Receitas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  