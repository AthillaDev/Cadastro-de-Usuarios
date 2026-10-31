// Ponto de entrada da aplicação: monta o React dentro da <div id="root"> do index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyle } from './styles/GloblaStyles.js'
import { RouterProvider } from "react-router-dom"
import router from "./routes.jsx"

// StrictMode só ajuda em desenvolvimento: avisa sobre problemas e executa efeitos duas vezes para expô-los.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Estilos globais aplicados a toda a página (margem, fonte, box-sizing). */}
    <GlobalStyle />
    {/* Decide qual página renderizar com base na URL, usando as rotas de routes.jsx. */}
    <RouterProvider router={router} />
  </StrictMode>,
)
