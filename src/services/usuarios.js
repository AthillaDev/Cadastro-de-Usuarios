// Funções que conversam com a API de usuários.
// As telas chamam estas funções em vez de usar o axios diretamente, assim a URL fica em um só lugar.
import api from "./api.js";

/**
 * Busca todos os usuários cadastrados.
 * @returns {Promise<Array<{id: string, name: string, email: string, age: number, genero: string}>>}
 */
export async function listarUsuarios() {
  const { data } = await api.get("/usuarios");

  return data;
}

/**
 * Cadastra um novo usuário.
 * @param {{name: string, email: string, age: number, genero: string}} usuario
 */
export async function cadastrarUsuario(usuario) {
  await api.post("/usuarios", usuario);
}

/**
 * Remove um usuário pelo id.
 * @param {string} id
 */
export async function excluirUsuario(id) {
  await api.delete(`/usuarios/${id}`);
}
