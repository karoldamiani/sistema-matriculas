class FormTurma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disciplinaId: '',
      professorId: '',
      dia: '',
      turno: '',
      vagas: 30,
      mensagem: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault(); 
    const { disciplinaId, professorId, dia, turno, vagas } = this.state;

    if (!disciplinaId || !professorId || !dia || !turno) {
      this.setState({ mensagem: { tipo: 'danger', texto: 'Preencha todos os campos.' } });
      return;
    }
    if (Number(vagas) < 1) {
      this.setState({ mensagem: { tipo: 'danger', texto: 'O número de vagas deve ser pelo menos 1.' } });
      return;
    }

    const horario = dia + turno; 

    // Regra: professor não pode ter duas turmas no mesmo horário
    const professorOcupado = this.props.turmas.some(
      (t) => t.professorId === Number(professorId) && t.horario === horario
    );
    if (professorOcupado) {
      this.setState({
        mensagem: { tipo: 'danger', texto: 'Este professor já tem uma turma nesse horário.' },
      });
      return;
    }

    try {
      await apiPost('turmas', {
        disciplinaId: Number(disciplinaId),
        professorId: Number(professorId),
        horario,
        vagas: Number(vagas),
      });
      await this.props.aoSalvar(); 
      this.setState({
        disciplinaId: '',
        professorId: '',
        dia: '',
        turno: '',
        vagas: 30,
        mensagem: { tipo: 'success', texto: 'Turma cadastrada com sucesso!' },
      });
    } catch (erro) {
      console.error(erro);
      this.setState({ mensagem: { tipo: 'danger', texto: 'Erro ao salvar a turma.' } });
    }
  }

  render() {
    const { disciplinas, professores } = this.props;
    const { disciplinaId, professorId, dia, turno, vagas, mensagem } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="card card-body">
        <h4>Nova turma</h4>

        {mensagem && <div className={'alert alert-' + mensagem.tipo}>{mensagem.texto}</div>}

        <label className="form-label">Disciplina</label>
        <select name="disciplinaId" className="form-select mb-3"
                value={disciplinaId} onChange={this.handleChange}>
          <option value="">Selecione...</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>{d.nome}</option>
          ))}
        </select>

        <label className="form-label">Professor</label>
        <select name="professorId" className="form-select mb-3"
                value={professorId} onChange={this.handleChange}>
          <option value="">Selecione...</option>
          {professores.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <label className="form-label">Dia da semana</label>
        <select name="dia" className="form-select mb-3"
                value={dia} onChange={this.handleChange}>
          <option value="">Selecione...</option>
          {Object.keys(DIAS).map((codigo) => (
            <option key={codigo} value={codigo}>{DIAS[codigo]}</option>
          ))}
        </select>

        <label className="form-label">Turno</label>
        <select name="turno" className="form-select mb-3"
                value={turno} onChange={this.handleChange}>
          <option value="">Selecione...</option>
          {Object.keys(TURNOS).map((codigo) => (
            <option key={codigo} value={codigo}>{TURNOS[codigo]}</option>
          ))}
        </select>

        <label className="form-label">Vagas</label>
        <input type="number" name="vagas" min="1" className="form-control mb-3"
               value={vagas} onChange={this.handleChange} />

        <button type="submit" className="btn btn-primary">Cadastrar turma</button>
      </form>
    );
  }
}