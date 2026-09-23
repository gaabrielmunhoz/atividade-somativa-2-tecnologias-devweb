import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

function formatarData(data){

    if (!data) return ""

    const [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano}`
}

function Principal(){
    const [usuario, setUsuario] = useState(null)
    const [mensagem, setMensagem] = useState("")
    const [carregando, setCarregando] = useState(true)

    const navigate = useNavigate()

    useEffect(()=> {
        const verificarUsuario= onAuthStateChanged(auth, async (usuarioAutenticado)=> {
            if (!usuarioAutenticado){
                setCarregando(false)
                navigate("/login")
                return
            }

            try {
                const referenciaUsuario = doc(
                    db,
                    "usuarios",
                    usuarioAutenticado.uid
                )

                const dadosUsuario = await getDoc(referenciaUsuario)

                if (dadosUsuario.exists()) {
                    setUsuario(dadosUsuario.data())
                } else {
                    setMensagem("Dados não encontrados.")
                }
            } catch (erro){
                console.log(erro)
                setMensagem("Não foi possível carregar os dados do usuário.")
            } finally {
                setCarregando(false)
            }
        })

        return ()=> verificarUsuario()
    }, [navigate])

    if (carregando){
        return <p>Carregando...</p>
    }

    async function sair(){
            await signOut(auth)
        }

    return(
        <div>
            <h1>Principal</h1>

            {mensagem && <p>{mensagem}</p>}

            {usuario && (
                <div>
                    <p>Nome: {usuario.nome}</p>
                    <p>Sobrenome: {usuario.sobrenome}</p>
                    <p>Data de Nascimento: {formatarData(usuario.dataNascimento)}</p>
                </div>
            )}
            <br />
            <button type="button" onClick={sair}>Sair</button>

        </div>
    )
}

export default Principal