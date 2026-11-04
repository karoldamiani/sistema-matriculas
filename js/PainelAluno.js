class PainelAluno extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mensagem: null };
    this.matricular = this.matricular.bind(this);
    this.cancelar = this.cancelar.bind(this);
  }

  async matricular(turmaId) {
    const alunoId = this.context.alunoId;
    const { turmas, matriculas, disciplinas } = this.props;
    const turma = turmas.find((t) => t.id === turmaId);

    // Regra 1: respeitar o limite de vagas
    const ocupadas = matriculas.filter((m) => m.turmaId === turmaId).length;
    if (ocupadas >= turma.vagas) {
      this.setState({ mensagem: { tipo: 'danger', texto: 'Esta turma não tem mais vagas.' } });
      return;
    }

    // Regra 2: não pode haver duas turmas no mesmo horário
    const idsDasMinhasTurmas = matriculas
      .filter((m) => m.alunoId === alunoId)
      .map((m) => m.turmaId);
    const conflito = turmas.find(
      (t) => idsDasMinhasTurmas.includes(t.id) && t.horario === turma.horario
    );
    if (conflito) {
      this.setState({
        mensagem: {
          tipo: 'danger',
          texto: 'Conflito de horário com ' + nomeDe(disciplinas, conflito.disciplinaId) +
                 ' (' + descreverHorario(conflito.horario) + ').',
        },
      });
      return;
    }

    try {
      await apiPost('matriculas', { alunoId, turmaId });
      await this.props.recarregar();
      this.setState({ mensagem: { tipo: 'success', texto: 'Matrícula realizada com sucesso!' } });
    } catch (erro) {
      console.error(erro);
      this.setState({ mensagem: { tipo: 'danger', texto: 'Erro ao realizar a matrícula.' } });
    }
  }

  async cancelar(matriculaId) {
    if (!window.confirm('Deseja cancelar esta matrícula?')) {
      return;
    }
    try {
      await apiDelete('matriculas', matriculaId);
      await this.props.recarregar();
      this.setState({ mensagem: { tipo: 'success', texto: 'Matrícula cancelada.' } });
    } catch (erro) {
      console.error(erro);
      this.setState({ mensagem: { tipo: 'danger', texto: 'Erro ao cancelar a matrícula.' } });
    }
  }

  render() {
    const { turmas, disciplinas, professores, matriculas, alunos } = this.props;
    const alunoId = this.context.alunoId;
    const aluno = alunos.find((a) => a.id === alunoId);
    const { mensagem } = this.state;

    // Matrículas do aluno logado
    const minhas = matriculas.filter((m) => m.alunoId === alunoId);
    const itensMatriculas = minhas.map((m) => {
      const turma = turmas.find((t) => t.id === m.turmaId);
      if (!turma) {
        return null;
      }
      return (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={m.id}>
          <span>
            <strong>{nomeDe(disciplinas, turma.disciplinaId)}</strong>
            {' — '}{nomeDe(professores, turma.professorId)}
            {' — '}{descreverHorario(turma.horario)}
          </span>
          <button className="btn btn-sm btn-outline-danger" onClick={() => this.cancelar(m.id)}>
            Cancelar
          </button>
        </li>
      );
    });

    // Todas as turmas ofertadas
    const cards = turmas.map((t) => {
      const ocupadas = matriculas.filter((m) => m.turmaId === t.id).length;
      const matriculado = minhas.some((m) => m.turmaId === t.id);
      return (
        <div className="col-md-4 mb-3" key={t.id}>
          <CardTurma
            turma={t}
            disciplina={nomeDe(disciplinas, t.disciplinaId)}
            professor={nomeDe(professores, t.professorId)}
            ocupadas={ocupadas}
            matriculado={matriculado}
            aoMatricular={this.matricular}
          />
        </div>
      );
    });

    return (
      <div>
        <h2>Painel do Aluno</h2>
        <p className="text-muted">Logado como <strong>{aluno ? aluno.nome : ''}</strong></p>

        {mensagem && <div className={'alert alert-' + mensagem.tipo}>{mensagem.texto}</div>}

        <h4>Minhas matrículas</h4>
        {minhas.length === 0 ? (
          <p className="text-muted">Você ainda não está matriculado em nenhuma turma.</p>
        ) : (
          <ul className="list-group mb-4">{itensMatriculas}</ul>
        )}

        <h4>Turmas ofertadas</h4>
        <div className="row">{cards}</div>
      </div>
    );
  }
}

PainelAluno.contextType = UsuarioContext;