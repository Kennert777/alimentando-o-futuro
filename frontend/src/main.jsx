import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Componente para configurar documento via React
const DocumentConfig = () => {
  useEffect(() => {
    document.title = 'Alimentando o Futuro';
    document.documentElement.lang = 'pt-BR';
    
    // Adicionar fontes
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Nunito:wght@300;400;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap',
      'https://fonts.cdnfonts.com/css/caviar-dreams'
    ];
    
    fonts.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);
  
  return null;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DocumentConfig />
    <App />
  </StrictMode>,
)
