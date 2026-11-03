class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carregando: true,
      erro: null,
      perfil: 'instituicao', 
      alunoId: 1,          
      disciplinas: [],
      professores: [],
      alunos: [],
      turmas: [],
      matriculas: [],
    };
    this.carregarDados = this.carregarDados.bind(this);
    this.trocarPerfil = this.trocarPerfil.bind(this);
    this.trocarAluno = this.trocarAluno.bind(this);
  }

  componentDidMount() {
    this.carregarDados();
  }

  trocarPerfil(perfil) {
    this.setState({ perfil });
  }

  trocarAluno(alunoId) {
    this.setState({ alunoId });
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
        erro: 'Não foi possível carregar os dados. O json-server está rodando?',
      });
    }
  }

  render() {
    const {
      carregando, erro, perfil, alunoId,
      disciplinas, professores, alunos, turmas, matriculas,
    } = this.state;

    const dados = { disciplinas, professores, alunos, turmas, matriculas };
    const valorContexto = {
      perfil,
      alunoId,
      trocarPerfil: this.trocarPerfil,
      trocarAluno: this.trocarAluno,
    };

    let conteudo;
    if (carregando) {
      conteudo = <p>Carregando...</p>;
    } else if (erro) {
      conteudo = <div className="alert alert-danger">{erro}</div>;
    } else if (perfil === 'instituicao') {
      conteudo = <PainelInstituicao {...dados} recarregar={this.carregarDados} />;
    } else {
      conteudo = <PainelAluno {...dados} recarregar={this.carregarDados} />;
    }

    return (
      <UsuarioContext.Provider value={valorContexto}>
        <Navbar alunos={alunos} />
        <div className="container mt-4">{conteudo}</div>
      </UsuarioContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));