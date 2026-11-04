class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Faz a próxima renderização mostrar a UI alternativa
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Registra o erro (aqui, no console)
  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-4">
          <div className="alert alert-danger">
            <h4>Algo deu errado.</h4>
            <p>Ocorreu um erro inesperado na aplicação.</p>
            <button className="btn btn-danger" onClick={() => window.location.reload()}>
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}