const AdicionarFilme = () => {
    return (
        <>
        <main>
            <div className="conteudoCadastrarFilme">
                <div className="cadastrarFilme">
                    <form action="">
                        <h1>Cadastrar novo filme</h1>
                        <div className="formularioCadastrarFilme">
                            <label>Título:</label>
                            <input
                                type="text"
                                value={titulo}
                                required
                                placeholder="Digite aqui o título do filme"
                            />
                            <div className="avaliacaoEduracao">
                                <label>Avaliação (0 a 5):</label>
                                <input
                                    type="number"
                                    value={avaliacao}
                                    required
                                    placeholder="Ex: 4.6"
                                />
                                <label>Duração (em min):</label>
                                <input
                                    type="number"
                                    value={duracao}
                                    required
                                    placeholder="Ex: 139"
                                />
                            </div>
                            <label>Ano de publicação:</label>
                            <input
                                type="number"
                                value={ano}
                                required
                                placeholder="Ex: 2006"
                            />
                            <label>Descrição / Sinopse:</label>
                            <textarea
                                type="text"
                                value={descricao}
                                required
                                placeholder="Digite aqui a sinopse do filme"
                            />

                        </div>
                    </form>
                </div>
                <div className="imagemCadastrarFilme">
                    <img src="" alt="Imagem que for add pelo usuario pela url" />

                    <label>URL do poster:</label>
                    <input
                        type="text"
                        value={poster}
                        required
                        placeholder="Cole aqui a URL da imagem para o poster"
                    />
                </div>
            </div>
        </main>
        </>
    )
}

export default AdicionarFilme;