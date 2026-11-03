class CardTurma extends React.Component {
  render() {
    const { turma, disciplina, professor, ocupadas, matriculado, aoMatricular } = this.props;
    const lotada = ocupadas >= turma.vagas;

    let botao;
    if (matriculado) {
      botao = <button className="btn btn-success w-100" disabled>✔ Matriculado</button>;
    } else if (lotada) {
      botao = <button className="btn btn-secondary w-100" disabled>Turma lotada</button>;
    } else {
      botao = (
        <button className="btn btn-primary w-100" onClick={() => aoMatricular(turma.id)}>
          Matricular
        </button>
      );
    }

    return (
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{disciplina}</h5>
          <p className="card-text mb-1">👨‍🏫 {professor}</p>
          <p className="card-text mb-1">🕒 {descreverHorario(turma.horario)}</p>
          <p className="card-text">Vagas: {ocupadas}/{turma.vagas}</p>
        </div>
        <div className="card-footer">{botao}</div>
      </div>
    );
  }
}