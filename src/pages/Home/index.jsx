// Tela de cadastro de usuários: lê os campos, valida, envia à API e dá feedback ao usuário.
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { cadastrarUsuario } from "../../services/usuarios.js"
import { validarUsuario } from "../../utils/validarUsuario.js"

import { Form, ConteinerInput, Input, InputLabel, Campo, ErroCampo } from "./styles.js"
import { Conteiner, Title, Mensagem } from "../../styles/shared.js"

import Button from "../../components/Button/index.jsx"
import TopBackground from "../../components/TopBackground/index.jsx"

function Home() {
  // Referências aos campos. Como os campos não são controlados por estado,
  // lemos o valor com inputX.current.value no momento do envio.
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  const inputGenero = useRef()

  const navigate = useNavigate()

  // Mensagem geral exibida no formulário (sucesso ou erro).
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" })
  // Erro de cada campo, no formato { name: "...", email: "..." }. Vazio quando não há erros.
  const [erros, setErros] = useState({})

  // Remove o erro de um campo assim que o usuário altera o valor.
  function limparErro(campo) {
    setErros((errosAtuais) => ({ ...errosAtuais, [campo]: undefined }))
  }

  // Executada ao clicar em "Cadastrar Usuário".
  async function registerNewUser() {
    setMensagem({ texto: "", tipo: "" })

    // Monta os dados a partir dos campos. trim() remove espaços do início e do fim.
    const usuario = {
      name: inputName.current.value.trim(),
      email: inputEmail.current.value.trim(),
      age: Number(inputAge.current.value),
      genero: inputGenero.current.value,
    }

    // Valida antes de enviar. Se houver erros, mostra cada um no campo e para aqui.
    const errosEncontrados = validarUsuario(usuario)
    setErros(errosEncontrados)

    if (Object.keys(errosEncontrados).length > 0) {
      setMensagem({ texto: "Corrija os campos destacados.", tipo: "erro" })
      return
    }

    try {
      await cadastrarUsuario(usuario)

      // Limpa o formulário após o sucesso.
      inputName.current.value = ""
      inputAge.current.value = ""
      inputEmail.current.value = ""
      inputGenero.current.value = ""

      setErros({})
      setMensagem({ texto: "Usuário cadastrado com sucesso!", tipo: "sucesso" })
    } catch (error) {
      // Erros de rede ou da API caem aqui. O detalhe técnico vai para o console; o usuário vê uma mensagem simples.
      console.error(error)
      setMensagem({ texto: "Não foi possível cadastrar o usuário.", tipo: "erro" })
    }
  }

  return (
    <Conteiner>
      <TopBackground />

      <Form>
        <Title>Cadastro de Usuários</Title>

        {/* Nome e idade ficam lado a lado. */}
        <ConteinerInput>
          <div>
            <InputLabel htmlFor="name">
              Nome<span> *</span>
            </InputLabel>
            {/* aria-invalid e aria-describedby ligam o campo ao erro para leitores de tela.
                onChange limpa o erro enquanto o usuário corrige o campo. */}
            <Input
              id="name"
              type="text"
              placeholder="Nome do Usuário"
              ref={inputName}
              required
              aria-invalid={erros.name ? "true" : "false"}
              aria-describedby={erros.name ? "erro-nome" : undefined}
              onChange={() => limparErro("name")}
            />
            {erros.name && <ErroCampo id="erro-nome">{erros.name}</ErroCampo>}
          </div>

          <div>
            <InputLabel htmlFor="idade">
              Idade<span> *</span>
            </InputLabel>
            {/* min, max e step orientam o navegador (setas do campo) e não substituem a validação. */}
            <Input
              id="idade"
              type="number"
              placeholder="Idade do Usuário"
              min="1"
              max="120"
              step="1"
              ref={inputAge}
              required
              aria-invalid={erros.age ? "true" : "false"}
              aria-describedby={erros.age ? "erro-idade" : undefined}
              onChange={() => limparErro("age")}
            />
            {erros.age && <ErroCampo id="erro-idade">{erros.age}</ErroCampo>}
          </div>
        </ConteinerInput>

        <Campo>
          <InputLabel htmlFor="email">
            E-mail<span> *</span>
          </InputLabel>
          <Input
            id="email"
            type="email"
            placeholder="E-mail do Usuário"
            ref={inputEmail}
            required
            aria-invalid={erros.email ? "true" : "false"}
            aria-describedby={erros.email ? "erro-email" : undefined}
            onChange={() => limparErro("email")}
          />
          {erros.email && <ErroCampo id="erro-email">{erros.email}</ErroCampo>}
        </Campo>

        <Campo>
          <InputLabel htmlFor="genero">
            Gênero<span> *</span>
          </InputLabel>
          {/* O gênero escolhido define qual conjunto de avatares aparece na lista. */}
          <select
            id="genero"
            ref={inputGenero}
            required
            aria-invalid={erros.genero ? "true" : "false"}
            aria-describedby={erros.genero ? "erro-genero" : undefined}
            onChange={() => limparErro("genero")}
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
          {erros.genero && <ErroCampo id="erro-genero">{erros.genero}</ErroCampo>}
        </Campo>

        {/* role="alert" anuncia erros imediatamente; "status" anuncia sucesso sem interromper. */}
        {mensagem.texto && (
          <Mensagem
            $tipo={mensagem.tipo}
            role={mensagem.tipo === "erro" ? "alert" : "status"}
          >
            {mensagem.texto}
          </Mensagem>
        )}

        <Button type="button" onClick={registerNewUser} theme="primary">
          Cadastrar Usuário
        </Button>
      </Form>

      <Button type="button" onClick={() => navigate("/lista-de-usuarios")} theme="secondary">
        Ver Lista de Usuário
      </Button>
    </Conteiner>
  )
}

export default Home
