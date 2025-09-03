// Componente do rodapé - aparece em todas as páginas
export default function Footer() {
  return (
    // Footer com fundo verde escuro e texto branco
    <footer className="mt-5 py-4" style={{ backgroundColor: "#4F732C", color: "white" }}>
      <div className="container">
        {/* Grid responsivo com 3 colunas de informações */}
        <div className="row">
          {/* Coluna 1: Informações sobre o projeto */}
          <div className="col-md-4">
            <h5>Feeding the Future</h5>
            <p>Promovendo sustentabilidade através da educação.</p>
          </div>
          
          {/* Coluna 2: Informações de contato */}
          <div className="col-md-4">
            <h5>Contato</h5>
            <p>Email: contato@feedingthefuture.com<br/>
            Telefone: (11) 9999-9999</p>
          </div>
          
          {/* Coluna 3: Redes sociais */}
          <div className="col-md-4">
            <h5>Redes Sociais</h5>
            <p>@feedingthefuture</p>
          </div>
        </div>
        
        {/* Linha divisora */}
        <hr className="my-3"/>
        
        {/* Copyright centralizado */}
        <div className="text-center">
          <small>&copy; 2025 ITB - INF2CM. Todos os direitos reservados.</small>
        </div>
      </div>
    </footer>
  );
}