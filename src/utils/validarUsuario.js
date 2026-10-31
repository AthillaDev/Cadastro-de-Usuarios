// Regras de validação do formulário de cadastro. Mantidas fora do componente para poderem ser testadas e reaproveitadas.

// Formato "texto@texto.texto", sem espaços. Não valida se o domínio existe.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida os dados de um usuário.
 * @param {{name: string, email: string, age: number, genero: string}} dados
 * @returns {Object<string, string>} Um objeto com a mensagem de erro de cada campo inválido.
 *          Se estiver vazio, os dados são válidos.
 */
export function validarUsuario({ name, email, age, genero }) {
  const erros = {};

  // Nome: entre 2 e 100 caracteres.
  if (name.length < 2) {
    erros.name = "O nome precisa ter pelo menos 2 caracteres.";
  } else if (name.length > 100) {
    erros.name = "O nome pode ter no máximo 100 caracteres.";
  }

  // Idade: Number.isInteger rejeita NaN (campo vazio ou texto) e decimais.
  if (!Number.isInteger(age) || age < 1 || age > 120) {
    erros.age = "Informe uma idade inteira entre 1 e 120.";
  }

  if (!EMAIL_REGEX.test(email)) {
    erros.email = "Informe um e-mail válido, como nome@dominio.com.";
  }

  // Gênero: só os dois valores usados pela escolha do avatar.
  if (genero !== "masculino" && genero !== "feminino") {
    erros.genero = "Selecione o gênero.";
  }

  return erros;
}
