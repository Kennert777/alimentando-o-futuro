import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'linear-gradient(135deg, #245829 0%, #357a38 25%, #45a049 50%, #4CAF50 75%, #8fd18f 100%)', color: 'white' }}>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h5 style={{ fontFamily: 'Playfair Display', fontWeight: '1000' }}>Alimentando o Futuro</h5>
            <p className="small" style={{ fontFamily: 'Cormorant Garamond' }}>
              Promovendo alimentação saudável e sustentável através da tecnologia e educação.
            </p>
          </div>
          <div className="col-md-3">
            <h6 style={{ fontFamily: 'Playfair Display' }}>Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-white-50 text-decoration-none">Início</Link></li>
              <li><Link to="/horta" className="text-white-50 text-decoration-none">Horta</Link></li>
              <li><Link to="/receitas" className="text-white-50 text-decoration-none">Receitas</Link></li>
              <li><Link to="/apoio" className="text-white-50 text-decoration-none">Apoio</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 style={{ fontFamily: 'Playfair Display' }}>Contato</h6>
            <p className="small text-white-50" style={{ fontFamily: 'Cormorant Garamond' }}>
              rm94720@estudante.fieb.edu.br
            </p>
          </div>
        </div>
        <hr className="border-white-50" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="small mb-1 text-white-50">
              © {currentYear} Alimentando o Futuro. Todos os direitos reservados.
            </p>
            <p className="small mb-0 text-white-50">
              ITB | Técnico em Informática | INF2CM | 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}