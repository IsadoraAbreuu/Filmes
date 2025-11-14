import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardPessoa from "../../components/CardDiretorEAtor/cardPessoas";
import './descricao.css'

export default function DetalhesFilme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔧 Função para gerar URL da imagem
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000/${path}`;
  };

  useEffect(() => {
    const fetchFilme = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/filme?id=${id}`);
        if (!res.ok) throw new Error("Erro ao buscar filme");

        const json = await res.json();
        if (json.status !== "ok") throw new Error("Resposta inválida");

        setFilme({
          ...json.data,
          poster: getImageUrl(json.data.poster)
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilme();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!filme) return <p>Filme não encontrado.</p>;

  return (
    <main>
      <div style={{ padding: "20px" }}>
        <h2>Descrição</h2>
        <p>{filme.descricao}</p>

        <h3>Gêneros</h3>
        <ul>
          {filme.generos?.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>

        <p>Ano: {filme.ano}</p>
        <p>Avaliação: {filme.avaliacao}</p>

        {filme.tempo_duracao && (
          <>
            <h3>Duração</h3>
            <p>{Math.round(filme.tempo_duracao)} minutos</p>
          </>
        )}

        <h2>Direção</h2>
        {filme.diretores.map((diretor) => (
        <CardPessoa 
            key={diretor.id}
            fotoUrl={diretor.fotoUrl} // 👈 Passa a URL externa completa
            nomeCompleto={diretor.nome}
            role="Diretor"
        />
        ))}

        <h2>Elenco</h2>
        {filme.atores.map((ator) => (
        <CardPessoa 
            key={ator.id}
            fotoUrl={ator.fotoUrl} // 👈 Passa a URL externa completa
            nomeCompleto={ator.nome}
            role="Ator"
          />
      ))}
          </div>

        {filme.produtoras?.length > 0 && (
          <>
            <h3>Produtoras</h3>
            <div className="listaPessoas">
              {filme.produtoras.map((p, i) => (
                <div key={i} className="pessoaCard">
                  <img src={getImageUrl(p.logo)} alt={p.nome} />
                  <p>{p.nome}</p>
                </div>
              ))}
            </div>
          </>
        )}

      
    </main>
  );
}
