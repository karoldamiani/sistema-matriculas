class Navbar extends React.Component {
  render() {
    // Lê o valor global do Context
    const { perfil, alunoId, trocarPerfil, trocarAluno } = this.context;
    const { alunos } = this.props;

    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">🎓 Sistema de Matrículas</span>

          <div className="d-flex gap-2 align-items-center">
            <div className="btn-group">
              <button
                className={'btn btn-sm ' + (perfil === 'instituicao' ? 'btn-light' : 'btn-outline-light')}
                onClick={() => trocarPerfil('instituicao')}>
                Instituição
              </button>
              <button
                className={'btn btn-sm ' + (perfil === 'aluno' ? 'btn-light' : 'btn-outline-light')}
                onClick={() => trocarPerfil('aluno')}>
                Aluno
              </button>
            </div>

            {perfil === 'aluno' && (
              <select
                className="form-select form-select-sm"
                value={alunoId}
                onChange={(e) => trocarAluno(Number(e.target.value))}>
                {alunos.map((a) => (
                  <option key={a.id} value={a.id}>{a.nome}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = UsuarioContext;