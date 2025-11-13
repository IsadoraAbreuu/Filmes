import React, { useState, useEffect } from "react";
import Select from 'react-select'; // <-- Importando a biblioteca
import "./formFilme.css";
import Botao from '../../components/Botao/botao'
import IconeAdicionar from '../../assets/icons/add-botao.svg'

const FormFilme = ({ modo = "add", filmeInicial = {}, onSubmit }) => {
    // estados do formulário
    const [titulo, setTitulo] = useState(filmeInicial.titulo || "");
    const [avaliacao, setAvaliacao] = useState(filmeInicial.avaliacao || "");
    const [duracao, setDuracao] = useState(filmeInicial.duracao || "");
    const [ano, setAno] = useState(filmeInicial.ano || "");
    const [descricao, setDescricao] = useState(filmeInicial.descricao || "");
    // Mantemos o estado como IDs (strings ou números)
    const [generosSelecionados, setGenerosSelecionados] = useState(filmeInicial.generos || []); 
    const [produtorasSelecionadas, setProdutorasSelecionadas] = useState(filmeInicial.produtoras || []); 
    const [poster, setPoster] = useState(filmeInicial.poster || "");
    const [atoresSelecionados, setAtoresSelecionados] = useState(filmeInicial.atores || []);
    const [diretoresSelecionados, setDiretoresSelecionados] = useState(filmeInicial.diretores || []);

    // estados auxiliares
    const [generos, setGeneros] = useState([]);
    const [produtoras, setProdutoras] = useState([]);
    const [atores, setAtores] = useState([]);
    const [diretores, setDiretores] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // --- FUNÇÕES HELPERS PARA O REACT-SELECT ---

    // 1. Mapeia os dados brutos da API para o formato {value: ID, label: NOME}
    const mapOptions = (data) => data.map(item => ({
        value: item._id, 
        label: item.nome 
    }));
    
    // 2. Transforma os IDs selecionados de volta para o formato de objeto do react-select
    const mapSelected = (selectedIds, options) => {
        // Encontra o objeto de opção correspondente a cada ID selecionado
        return options.filter(option => selectedIds.includes(option.value));
    };

    // Mapeamento dos dados que serão usados no Select
    const generoOptions = mapOptions(generos);
    const produtoraOptions = mapOptions(produtoras);
    const atorOptions = mapOptions(atores);
    const diretorOptions = mapOptions(diretores);
    
    // Valores Selecionados para passar ao 'value' do Select
    const selectedGeneros = mapSelected(generosSelecionados, generoOptions);
    const selectedProdutoras = mapSelected(produtorasSelecionadas, produtoraOptions);
    const selectedAtores = mapSelected(atoresSelecionados, atorOptions);
    const selectedDiretores = mapSelected(diretoresSelecionados, diretorOptions);


    // buscar opções de dropdowns no backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resGeneros, resProdutoras, resAtores, resDiretores] = await Promise.all([
                    fetch("http://localhost:8000/api/generos"),
                    fetch("http://localhost:8000/api/produtoras"),
                    fetch("http://localhost:8000/api/atores"),
                    fetch("http://localhost:8000/api/diretores"),
                ]);

                const generosData = await resGeneros.json();
                const produtorasData = await resProdutoras.json();
                const atoresData = await resAtores.json();
                const diretoresData = await resDiretores.json();

                // Assumindo que a API retorna um array de objetos, ex: [{_id: 1, nome: "Ação"}]
                setGeneros(generosData.data || generosData);
                setProdutoras(produtorasData.data || produtorasData);
                setAtores(atoresData.data || atoresData);
                setDiretores(diretoresData.data || diretoresData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setError("Erro ao carregar dados do servidor.");
            }
        };

        fetchData();
    }, []);


    // submeter formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const filmeData = {
            titulo,
            avaliacao,
            descricao,
            generos: generosSelecionados, // Enviamos apenas os IDs/valores selecionados
            produtoras: produtorasSelecionadas, // Enviamos apenas os IDs/valores selecionados
            ano,
            duracao,
            poster,
            atores: atoresSelecionados,
            diretores: diretoresSelecionados,
        };

        try {
            const url =
                modo === "edit"
                    ? `http://localhost:3001/api/filmes/${filmeInicial._id}`
                    : "http://localhost:3001/api/filmes";

            const method = modo === "edit" ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(filmeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao salvar o filme");
            }

            const data = await response.json();
            setSuccess(modo === "edit" ? "Filme atualizado com sucesso!" : "Filme cadastrado com sucesso!");

            if (onSubmit) onSubmit(data);

            // Limpar campos apenas no modo "add"
            if (modo === "add") {
                setTitulo("");
                setAvaliacao("");
                setDuracao("");
                setAno("");
                setDescricao("");
                setGenerosSelecionados([]);
                setProdutorasSelecionadas([]);
                setPoster("");
                setAtoresSelecionados([]);
                setDiretoresSelecionados([]);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main>
            <div className="conteudoCadastrarFilme">
                <div className="imagemCadastrarFilme">
                    <div className="containerImagem">
                        {poster ? (
                          <img
                            src={poster}
                            alt="Poster do filme"
                            className="poster-preview"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <p className="poster-placeholder">A imagem aparecerá aqui...</p>
                        )}
                    </div>
                    <label>URL do poster:</label>
                    <input
                      type="text"
                      value={poster}
                      onChange={(e) => setPoster(e.target.value)}
                      required
                      placeholder="Cole aqui a URL da imagem para o poster"
                    />
                </div>

                <div className="cadastrarFilme">
                    <form onSubmit={handleSubmit}>
                        <h1>{modo === "edit" ? "Editar filme" : "Cadastrar novo filme"}</h1>

                        <label>Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            placeholder="Digite aqui o título do filme"
                        />

                        <div className="avaliacaoEduracao">
                            <div className="avaliacao">
                                <label>Avaliação (0 a 5):</label>
                                <input
                                    type="number"
                                    value={avaliacao}
                                    onChange={(e) => setAvaliacao(e.target.value)}
                                    required
                                    placeholder="Ex: 4.6"
                                />
                            </div>
                            <div className="duracao">
                                <label>Duração (em min):</label>
                                <input
                                    type="number"
                                    value={duracao}
                                    onChange={(e) => setDuracao(e.target.value)}
                                    required
                                    placeholder="Ex: 139"
                                />
                            </div>
                        </div>

                        <label>Ano de publicação:</label>
                        <input
                            type="number"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                            required
                            placeholder="Ex: 2025"
                        />

                        <label>Descrição / Sinopse:</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            placeholder="Digite aqui a sinopse do filme"
                        />

                        {/* Dropdown de gêneros - AGORA USANDO REACT-SELECT */}
                        <label>Gêneros:</label>
                        <Select
                            isMulti
                            options={generoOptions}
                            value={selectedGeneros}
                            onChange={(selectedOptions) =>
                                setGenerosSelecionados(selectedOptions.map(option => option.value))
                            }
                            placeholder="Escolha aqui..."
                            classNamePrefix="custom-select"
                        />

                        {/* Dropdown de produtoras - AGORA USANDO REACT-SELECT */}
                        <label>Produtoras:</label>
                        <Select
                            isMulti
                            options={produtoraOptions}
                            value={selectedProdutoras}
                            onChange={(selectedOptions) =>
                                setProdutorasSelecionadas(selectedOptions.map(option => option.value))
                            }
                            placeholder="Escolha aqui..."
                            classNamePrefix="custom-select"
                        />

                        {/* Dropdown de atores - AGORA USANDO REACT-SELECT */}
                        <label>Atores:</label>
                        <Select
                            isMulti
                            options={atorOptions}
                            value={selectedAtores}
                            onChange={(selectedOptions) =>
                                setAtoresSelecionados(selectedOptions.map(option => option.value))
                            }
                            placeholder="Escolha aqui..."
                            classNamePrefix="custom-select"
                        />

                        {/* Dropdown de diretores - AGORA USANDO REACT-SELECT */}
                        <label>Diretores:</label>
                        <Select
                            isMulti
                            options={diretorOptions}
                            value={selectedDiretores}
                            onChange={(selectedOptions) =>
                                setDiretoresSelecionados(selectedOptions.map(option => option.value))
                            }
                            placeholder="Escolha aqui..."
                            classNamePrefix="custom-select"
                        />
                        
                        <div className="botaoCadastrar">
                            <Botao
                                link="/catalogo"
                                texto="Enviar novo filme"
                                iconeSrc={IconeAdicionar}
                            />
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}
                    </form>
                </div>
            </div>
        </main>
    );
};

export default FormFilme;