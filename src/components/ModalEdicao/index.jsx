// Janela de edição de usuário. Abre preenchida com os dados atuais e usa a mesma validação do cadastro.
import { useEffect, useState } from "react";

import { atualizarUsuario } from "../../services/usuarios.js";
import { validarUsuario } from "../../utils/validarUsuario.js";
import Button from "../Button/index.jsx";
import {
  Overlay,
  Dialogo,
  Titulo,
  Formulario,
  Campo,
  Rotulo,
  Input,
  Select,
  ErroCampo,
  ErroGeral,
  Acoes,
} from "./styles.js";

// Campos de texto do formulário. "atributos" traz restrições extras para o input HTML (só orientam o navegador).
const CAMPOS_TEXTO = [
  { nome: "name", rotulo: "Nome", tipo: "text" },
  { nome: "age", rotulo: "Idade", tipo: "number", atributos: { min: "1", max: "120", step: "1" } },
  { nome: "email", rotulo: "E-mail", tipo: "email" },
];

/**
 * @param {object} props
 * @param {{id: string, name: string, email: string, age: number, genero?: string}} props.usuario - Usuário que está sendo editado.
 * @param {(usuarioAtualizado: object) => void} props.onSalvar - Chamada depois que a API confirma a alteração.
 * @param {() => void} props.onFechar - Chamada ao cancelar, ao clicar fora ou ao apertar Esc.
 */
function ModalEdicao({ usuario, onSalvar, onFechar }) {
  // Os valores do formulário começam com os dados atuais. A idade vira texto, porque é o que o input guarda.
  const [dados, setDados] = useState({
    name: usuario.name,
    email: usuario.email,
    age: String(usuario.age),
    genero: usuario.genero ?? "",
  });
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Fecha a janela ao apertar Esc. O cleanup remove o ouvinte quando a janela fecha.
  useEffect(() => {
    function fecharComEscape(evento) {
      if (evento.key === "Escape") onFechar();
    }

    document.addEventListener("keydown", fecharComEscape);

    return () => document.removeEventListener("keydown", fecharComEscape);
  }, [onFechar]);

  // Atualiza o valor do campo e limpa o erro dele enquanto o usuário corrige.
  // O "name" do input é a chave do objeto dados, por isso a atualização usa [name].
  function alterarCampo(evento) {
    const { name, value } = evento.target;

    setDados((atuais) => ({ ...atuais, [name]: value }));
    setErros((atuais) => ({ ...atuais, [name]: undefined }));
  }

  async function salvar(evento) {
    // Impede o recarregamento da página, que é o comportamento padrão de um formulário.
    evento.preventDefault();

    const dadosLimpos = {
      name: dados.name.trim(),
      email: dados.email.trim(),
      age: Number(dados.age),
      genero: dados.genero,
    };

    const errosEncontrados = validarUsuario(dadosLimpos);
    setErros(errosEncontrados);
    setErroGeral("");

    if (Object.keys(errosEncontrados).length > 0) return;

    setEnviando(true);

    try {
      await atualizarUsuario(usuario.id, dadosLimpos);

      // Repassa o usuário com os dados novos para a lista trocar o card.
      onSalvar({ ...usuario, ...dadosLimpos });
    } catch (error) {
      console.error(error);
      setErroGeral("Não foi possível salvar as alterações.");
      setEnviando(false);
    }
  }

  return (
    // Clicar no fundo fecha a janela. O stopPropagation no Dialogo impede que um clique dentro dela também feche.
    <Overlay onClick={onFechar}>
      <Dialogo
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-edicao"
        onClick={(evento) => evento.stopPropagation()}
      >
        <Titulo id="titulo-edicao">Editar usuário</Titulo>

        {/* noValidate desliga a validação nativa do navegador, para a nossa mensagem aparecer. */}
        <Formulario onSubmit={salvar} noValidate>
          {CAMPOS_TEXTO.map((campo) => (
            <Campo key={campo.nome}>
              <Rotulo htmlFor={`edit-${campo.nome}`}>{campo.rotulo}</Rotulo>
              <Input
                id={`edit-${campo.nome}`}
                name={campo.nome}
                type={campo.tipo}
                value={dados[campo.nome]}
                onChange={alterarCampo}
                required
                autoFocus={campo.nome === "name"}
                aria-invalid={erros[campo.nome] ? "true" : "false"}
                aria-describedby={erros[campo.nome] ? `edit-erro-${campo.nome}` : undefined}
                {...campo.atributos}
              />
              {erros[campo.nome] && (
                <ErroCampo id={`edit-erro-${campo.nome}`}>{erros[campo.nome]}</ErroCampo>
              )}
            </Campo>
          ))}

          <Campo>
            <Rotulo htmlFor="edit-genero">Gênero</Rotulo>
            <Select
              id="edit-genero"
              name="genero"
              value={dados.genero}
              onChange={alterarCampo}
              required
              aria-invalid={erros.genero ? "true" : "false"}
              aria-describedby={erros.genero ? "edit-erro-genero" : undefined}
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Select>
            {erros.genero && <ErroCampo id="edit-erro-genero">{erros.genero}</ErroCampo>}
          </Campo>

          {erroGeral && <ErroGeral role="alert">{erroGeral}</ErroGeral>}

          <Acoes>
            <Button type="button" theme="secondary" onClick={onFechar}>
              Cancelar
            </Button>
            <Button type="submit" theme="primary" disabled={enviando}>
              {enviando ? "Salvando..." : "Salvar"}
            </Button>
          </Acoes>
        </Formulario>
      </Dialogo>
    </Overlay>
  );
}

export default ModalEdicao;
