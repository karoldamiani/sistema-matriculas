class PainelAluno extends React.Component {
  render() {
    return <h2>Painel do Aluno (id {this.context.alunoId})</h2>;
  }
}

PainelAluno.contextType = UsuarioContext;