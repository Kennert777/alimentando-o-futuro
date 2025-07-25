import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import HortaDigital from './HortaDigital';
import Receitas from './Receitas';
import Apoio from './Apoio';
import Sobre from './Sobre';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/horta" element={<HortaDigital />} />
            <Route path="/receitas" element={<Receitas />} />
            <Route path="/apoio" element={<Apoio />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
