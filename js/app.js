class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: true,
      erro: null,
      disciplinas: [],
      professores: [],
      alunos: [],
      turmas: [],
      matriculas: [],
    };
    this.carregarDados = this.carregarDados.bind(this);
  }

  componentDidMount() {
    this.carregarDados();
  }

  async carregarDados() {
    try {
      const [disciplinas, professores, alunos, turmas, matriculas] = await Promise.all([
        apiGet('disciplinas'),
        apiGet('professores'),
        apiGet('alunos'),
        apiGet('turmas'),
        apiGet('matriculas'),
      ]);
      this.setState({
        disciplinas, professores, alunos, turmas, matriculas,
        carregando: false,
        erro: null,
      });
    } catch (erro) {
      console.error(erro);
      this.setState({
        carregando: false,
        erro: 'Não foi possível carregar os dados.',
      });
    }
  }

  render() {
    const { carregando, erro, turmas } = this.state;

    if (carregando) {
      return <p className="container mt-4">Carregando...</p>;
    }
    if (erro) {
      return <div className="container mt-4 alert alert-danger">{erro}</div>;
    }
    return (
      <div className="container mt-4">
        <h1>Sistema de Matrículas</h1>
        <p>Foram carregadas {turmas.length} turmas.</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));