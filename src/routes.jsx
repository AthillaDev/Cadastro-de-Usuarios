// Mapa de rotas: liga cada endereço da URL à página que deve ser exibida.
import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import ListUsers from "./pages/ListUsers"

// Para criar uma nova tela, adicione um objeto com "path" (a URL) e "element" (o componente).
const router = createBrowserRouter([

    {
        // Tela de cadastro.
        path: "/",
        element: <Home />
    },
    {
        // Tela com a lista de usuários cadastrados.
        path: "/lista-de-usuarios",
        element: <ListUsers />
    }
])

export default router
