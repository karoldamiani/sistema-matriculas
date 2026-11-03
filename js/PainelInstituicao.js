class PainelInstituicao extends React.Component {
  render() {
    const { turmas, disciplinas, professores, matriculas, recarregar } = this.props;

    return (
      <div>
        <h2 className="mb-3">Painel da Instituição</h2>
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
            />
          </div>
        </div>
      </div>
    );
  }
}