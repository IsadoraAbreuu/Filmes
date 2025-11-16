import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./formFilme.css";
import Botao from '../../components/Botao/botao'
import IconeAdicionar from '../../assets/icons/add-botao.svg'

const FormFilme = ({ modo = "add", filmeInicial = {}, onSubmit }) => {
    const [titulo, setTitulo] = useState(filmeInicial.titulo || "");
    const [avaliacao, setAvaliacao] = useState(filmeInicial.avaliacao || "");
    const [duracao, setDuracao] = useState(filmeInicial.duracao || "");
    const [ano, setAno] = useState(filmeInicial.ano || "");
    const [descricao, setDescricao] = useState(filmeInicial.descricao || "");

    const [generosSelecionados, setGenerosSelecionados] = useState(filmeInicial.generos || []); 
    const [produtorasSelecionadas, setProdutorasSelecionadas] = useState(filmeInicial.produtoras || []); 
    const [poster, setPoster] = useState(filmeInicial.poster || "");
    const [atoresSelecionados, setAtoresSelecionados] = useState(filmeInicial.atores || []);
    const [diretoresSelecionados, setDiretoresSelecionados] = useState(filmeInicial.diretores || []);

    const [generos, setGeneros] = useState([]);
    const [produtoras, setProdutoras] = useState([]);
    const [atores, setAtores] = useState([]);
    const [diretores, setDiretores] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const mapOptions = (data) => data.map(item => ({
        value: item._id !== undefined ? item._id : item.id, 
        label: item.nome 
    }));
    
    const mapSelected = (selectedIds, options) => {
        if (!selectedIds || selectedIds.length === 0) return [];
        return options.filter(option => selectedIds.includes(option.value));
    };

    const getLabelsFromSelectedIds = (selectedIds, options) => {
        if (!selectedIds || selectedIds.length === 0) return [];
        return options
            .filter(option => selectedIds.includes(option.value))
            .map(option => option.label);
    };

    const generoOptions = mapOptions(generos);
    const produtoraOptions = mapOptions(produtoras);
    const atorOptions = mapOptions(atores);
    const diretorOptions = mapOptions(diretores);
    
    const selectedGeneros = mapSelected(generosSelecionados, generoOptions);
    const selectedProdutoras = mapSelected(produtorasSelecionadas, produtoraOptions);
    const selectedAtores = mapSelected(atoresSelecionados, atorOptions);
    const selectedDiretores = mapSelected(diretoresSelecionados, diretorOptions);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resGeneros, resProdutoras, resAtores, resDiretores] = await Promise.all([
                    fetch("http://localhost:8000/api/generos"),
                    fetch("http://localhost:8000/api/produtoras"),
                    fetch("http://localhost:8000/api/atores"),
                    fetch("http://localhost:8000/api/diretores"),
                ]);
                
                if (!resGeneros.ok || !resProdutoras.ok || !resAtores.ok || !resDiretores.ok) {
                    throw new Error("Falha ao carregar dados de uma ou mais APIs.");
                }

                const generosData = await resGeneros.json();
                const produtorasData = await resProdutoras.json();
                const atoresData = await resAtores.json();
                const diretoresData = await resDiretores.json();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const filmeData = {
            titulo,
            avaliacao,
            descricao,
            generos: getLabelsFromSelectedIds(generosSelecionados, generoOptions), 
            produtoras: getLabelsFromSelectedIds(produtorasSelecionadas, produtoraOptions), 
            ano,
            duracao,
            poster,
            atores: getLabelsFromSelectedIds(atoresSelecionados, atorOptions),
            diretores: getLabelsFromSelectedIds(diretoresSelecionados, diretorOptions),
        };

        try {
            const url =
                modo === "edit"
                    ? `http://localhost:8000/api/solicitar_edicao` 
                    : "http://localhost:8000/api/solicitar_adicao";

            const method = "POST"; 

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    // Mantido o token, se for obrigatório
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(filmeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao salvar o filme");
            }

            const data = await response.json();
            alert("✅ Sucesso! Solicitação enviada: " + (data.message || "Filme cadastrado."));
            setSuccess(modo === "edit" ? "Solicitação de edição criada!" : "Solicitação de cadastro criada e enviada para aprovação!");

            if (onSubmit) onSubmit(data);

            // limpa campos apenas no modo de add
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
                            texto="Enviar"
                            iconeSrc={IconeAdicionar}
                            type="submit" 
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