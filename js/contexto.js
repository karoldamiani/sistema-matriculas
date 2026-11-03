const UsuarioContext = React.createContext({
  perfil: 'instituicao',
  alunoId: null,
  trocarPerfil: () => {},
  trocarAluno: () => {},
});