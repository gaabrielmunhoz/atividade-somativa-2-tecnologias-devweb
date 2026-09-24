function Carregando({texto = "Carregando..."}){
    return(
        <div className="carregando-overlay">
            <div className="carregando-card">
                <div className="spinner"></div>
                <p>{texto}</p>
            </div>
        </div>
    )
}

export default Carregando