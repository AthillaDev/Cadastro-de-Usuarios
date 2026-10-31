// Tela de lista de usuários: busca os dados na API, mostra os cards e permite excluir.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listarUsuarios, excluirUsuario } from "../../services/usuarios.js";

import Button from "../../components/Button/index.jsx";
import TopBackground from "../../components/TopBackground/index.jsx";
import { Conteiner, Title, Mensagem } from "../../styles/shared.js";
import { Aviso, CardUsers, ConteinerUsers, BotaoExcluir, AvatarUsers } from "./styles.js";
import Trash from "../../assets/trash.svg";

/**
 * Monta a URL do avatar de um usuário.
 * O serviço tem conjuntos de avatares para meninos (/boy) e meninas (/girl).
 *
 * Limitação conhecida: o serviço externo devolve avatares aleatórios mesmo com o parâmetro
 * "username", então a imagem pode mudar a cada carregamento. Isso é um comportamento da API,
 * não do código.
 *
 * Observação: "masculino" usa /girl e "feminino" usa /boy porque, na verificação visual,
 * o serviço mostrou os conjuntos invertidos em relação à documentação. Teste antes de alterar.
 *
 * @param {{id: string, genero?: string}} user
 * @returns {string} URL da imagem.
 */
function getAvatarUrl(user) {
  const base = "https://avatarapi.runflare.run/public";

  if (user.genero === "masculino") return `${base}/girl?username=${user.id}`;
  if (user.genero === "feminino") return `${base}/boy?username=${user.id}`;

  // Usuários cadastrados antes da escolha de gênero recebem um avatar genérico.
  return `${base}?username=${user.id}`;
}

function ListUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // Começa como true porque a lista ainda não foi buscada quando a tela abre.
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  // Busca os usuários uma vez, quando a tela abre. O array [] vazio faz o efeito rodar só na montagem.
  useEffect(() => {
    async function getUsers() {
      try {
        const dados = await listarUsuarios();

        setUsers(dados);
      } catch (error) {
        console.error(error);
        setMensagem({ texto: "Não foi possível carregar a lista de usuários.", tipo: "erro" });
      } finally {
        // finally roda com sucesso ou erro, para o "Carregando" sempre sumir.
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  /**
   * Exclui um usuário após confirmação.
   * A lista só é atualizada depois que a API confirma a exclusão.
   * @param {string} id
   */
  async function deleteUsers(id) {
    const confirmou = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirmou) return;

    try {
      await excluirUsuario(id);

      // Remove o usuário da lista local sem precisar buscar tudo de novo.
      const updatedUsers = users.filter((user) => user.id !== id);

      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      setMensagem({ texto: "Não foi possível excluir o usuário.", tipo: "erro" });
    }
  }

  return (
    <Conteiner>
      <TopBackground />
      <Title>Lista de Usuários</Title>

      {mensagem.texto && (
        <Mensagem $tipo={mensagem.tipo} role={mensagem.tipo === "erro" ? "alert" : "status"}>
          {mensagem.texto}
        </Mensagem>
      )}
      {loading && <Aviso role="status">Carregando usuários...</Aviso>}
      {!loading && users.length === 0 && <Aviso role="status">Nenhum usuário cadastrado.</Aviso>}

      <ConteinerUsers>
        {/* key deve ser único em cada item da lista, para o React atualizar só o que mudou. */}
        {users.map((user) => (
          <CardUsers key={user.id}>
            <AvatarUsers src={getAvatarUrl(user)} alt={`Avatar de ${user.name}`} />
            <div>
              <h3>{user.name}</h3>
              <p>Idade: {user.age}</p>
              <p>{user.email}</p>
            </div>
            {/* A imagem é decorativa (alt vazio): o nome no aria-label informa a função do botão. */}
            <BotaoExcluir
              type="button"
              aria-label={`Excluir ${user.name}`}
              title="Excluir usuário"
              onClick={() => deleteUsers(user.id)}
            >
              <img src={Trash} alt="" />
            </BotaoExcluir>
          </CardUsers>
        ))}
      </ConteinerUsers>

      <Button type="button" onClick={() => navigate("/")} theme="secondary">
        Voltar
      </Button>
    </Conteiner>
  );
}

export default ListUsers;
