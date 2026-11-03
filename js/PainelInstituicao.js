class PainelInstituicao extends React.Component {
  render() {
    const { turmas, disciplinas, professores, matriculas } = this.props;

    return (
      <div>
        <h2 className="mb-3">Painel da Instituição</h2>
        <h4>Turmas ofertadas</h4>
        <TabelaTurmas
          turmas={turmas}
          disciplinas={disciplinas}
          professores={professores}
          matriculas={matriculas}
        />
      </div>
    );
  }
}