class TabelaTurmas extends React.Component {
  render() {
    const { turmas, disciplinas, professores, matriculas, aoExcluir } =
      this.props;

    if (turmas.length === 0) {
      return <p className="text-muted">Nenhuma turma cadastrada.</p>;
    }

    const linhas = turmas.map((t) => {
      const ocupadas = matriculas.filter((m) => m.turmaId === t.id).length;
      return (
        <tr key={t.id}>
          <td>{nomeDe(disciplinas, t.disciplinaId)}</td>

          <td>{nomeDe(professores, t.professorId)}</td>

          <td>
            {descreverHorario(t.horario)}{" "}
            <small className="text-muted">({t.horario})</small>
          </td>

          <td>
            {ocupadas}/{t.vagas}
          </td>

          <td className="text-end">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => aoExcluir(t.id)}
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Horário</th>
            <th>Vagas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{linhas}</tbody>
      </table>
    );
  }
}
