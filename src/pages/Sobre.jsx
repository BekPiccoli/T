import "../styles/Sobre.css";

function Sobre() {
  return (
    <div className="sobre-container">
      <div className="sobre-content">
        <h1 className="sobre-title">Sobre o Talk Language</h1>
        
        <div className="sobre-section">
          <p className="sobre-text">
            O Talk Language é um aplicativo inovador de aprendizado de idiomas, projetado para tornar a sua jornada de estudos mais interessante e interativa.
          </p>
        </div>
        
        <div className="sobre-section sobre-goals">
          <h2 className="sobre-subtitle">Nossos Objetivos</h2>
          <ul className="sobre-list">
            <li>Oferecer um aprendizado de idiomas envolvente e dinâmico.</li>
            <li>Proporcionar prática diária com atividades personalizadas.</li>
            <li>Permitir o acompanhamento de progresso e conquistas.</li>
            <li>Fomentar a motivação contínua através de recompensas.</li>
          </ul>
        </div>
        
        <div className="sobre-section sobre-features">
          <h2 className="sobre-subtitle">Funcionalidades</h2>
          <ul className="sobre-list">
            <li>Escolha de idiomas e níveis personalizados para aprendizado.</li>
            <li>Atividades diárias para reforçar o conteúdo estudado.</li>
            <li>Monitoramento de progresso com gráficos e metas.</li>
            <li>Sistema de recompensas para incentivar o estudo contínuo.</li>
          </ul>
        </div>

        <footer className="sobre-footer">
          <p>© 2024 Talk Language. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default Sobre;
