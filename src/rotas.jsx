import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from "./paginas/Cadastro"
import Login from "./paginas/Login"
import Principal from "./paginas/Principal"

function Rotas(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/principal" element={<Principal />} />
        </Routes>
        </BrowserRouter>
    )
}

export default Rotas