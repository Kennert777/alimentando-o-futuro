export default function Footer() {
  return (
    <footer className="mt-5 py-4" style={{ backgroundColor: "#4F732C", color: "white" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Feeding the Future</h5>
            <p>Promovendo sustentabilidade através da educação.</p>
          </div>
          <div className="col-md-4">
            <h5>Contato</h5>
            <p>Email: contato@feedingthefuture.com<br/>
            Telefone: (11) 9999-9999</p>
          </div>
          <div className="col-md-4">
            <h5>Redes Sociais</h5>
            <p>@feedingthefuture</p>
          </div>
        </div>
        <hr className="my-3"/>
        <div className="text-center">
          <small>&copy; 2025 ITB - INF2CM. Todos os direitos reservados.</small>
        </div>
      </div>
    </footer>
  );
}