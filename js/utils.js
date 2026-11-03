const API_URL = 'http://localhost:3001';

const DIAS = { 2: 'Segunda', 3: 'Terça', 4: 'Quarta', 5: 'Quinta', 6: 'Sexta', 7: 'Sábado' };
const TURNOS = { 1: 'Manhã', 2: 'Tarde', 3: 'Noite' };

function descreverHorario(codigo) {
  const texto = String(codigo);
  const dia = DIAS[texto[0]];
  const turno = TURNOS[texto[1]];
  if (!dia || !turno) {
    return 'Horário inválido';
  }
  return dia + ' - ' + turno;
}

function nomeDe(lista, id) {
  const item = lista.find((i) => i.id === id);
  return item ? item.nome : '—';
}

async function apiGet(recurso) {
  const resposta = await fetch(API_URL + '/' + recurso);
  if (!resposta.ok) {
    throw new Error('Erro ' + resposta.status + ' ao buscar ' + recurso);
  }
  return resposta.json();
}

async function apiPost(recurso, dados) {
  const resposta = await fetch(API_URL + '/' + recurso, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Erro ' + resposta.status + ' ao salvar em ' + recurso);
  }
  return resposta.json();
}

async function apiDelete(recurso, id) {
  const resposta = await fetch(API_URL + '/' + recurso + '/' + id, {
    method: 'DELETE',
  });
  if (!resposta.ok) {
    throw new Error('Erro ' + resposta.status + ' ao excluir de ' + recurso);
  }
}