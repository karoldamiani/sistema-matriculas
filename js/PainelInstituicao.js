class PainelInstituicao extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mensagem: null };
    this.excluirTurma = this.excluirTurma.bind(this);
  }

  async excluirTurma(id) {
    const ocupadas = this.props.matriculas.filter((m) => m.turmaId === id).length;
    if (ocupadas > 0) {
      this.setState({
        mensagem: { tipo: 'warning', texto: 'Não é possível excluir: há alunos matriculados nesta turma.' },
      });
      return;
    }
    if (!window.confirm('Deseja realmente excluir esta turma?')) {
      return;
    }
    try {
      await apiDelete('turmas', id);
      await this.props.recarregar();
      this.setState({ mensagem: { tipo: 'success', texto: 'Turma excluída.' } });
    } catch (erro) {
      console.error(erro);
      this.setState({ mensagem: { tipo: 'danger', texto: 'Erro ao excluir a turma.' } });
    }
  }

  render() {
    const { turmas, disciplinas, professores, matriculas, recarregar } = this.props;
    const { mensagem } = this.state;

    return (
      <div>
        <h2 className="mb-3">Painel da Instituição</h2>
        {mensagem && <div className={'alert alert-' + mensagem.tipo}>{mensagem.texto}</div>}
        <div className="row">
          <div className="col-md-4 mb-4">
            <FormTurma
              disciplinas={disciplinas}
              professores={professores}
              turmas={turmas}
              aoSalvar={recarregar}
            />
          </div>
          <div className="col-md-8">
            <h4>Turmas ofertadas</h4>
            <TabelaTurmas
              turmas={turmas}
              disciplinas={disciplinas}
              professores={professores}
              matriculas={matriculas}
              aoExcluir={this.excluirTurma}
            />
          </div>
        </div>
      </div>
    );
  }
}