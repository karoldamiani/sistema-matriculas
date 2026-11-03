class PainelAluno extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mensagem: null };
    this.matricular = this.matricular.bind(this);
  }

  async matricular(turmaId) {
  const alunoId = this.context.alunoId;
  const { turmas, matriculas, disciplinas } = this.props;
  const turma = turmas.find((t) => t.id === turmaId);

  // respeita o limite de vagas
  const ocupadas = matriculas.filter((m) => m.turmaId === turmaId).length;
  if (ocupadas >= turma.vagas) {
    this.setState({ mensagem: { tipo: 'danger', texto: 'Esta turma não tem mais vagas.' } });
    return;
  }

  // não pode haver duas turmas no mesmo horário
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

  render() {
    const { turmas, disciplinas, professores, matriculas, alunos } = this.props;
    const alunoId = this.context.alunoId;
    const aluno = alunos.find((a) => a.id === alunoId);
    const { mensagem } = this.state;

    const cards = turmas.map((t) => {
      const ocupadas = matriculas.filter((m) => m.turmaId === t.id).length;
      const matriculado = matriculas.some((m) => m.turmaId === t.id && m.alunoId === alunoId);
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
        <h4>Turmas ofertadas</h4>
        <div className="row">{cards}</div>
      </div>
    );
  }
}

PainelAluno.contextType = UsuarioContext;