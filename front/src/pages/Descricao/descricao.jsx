import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BannerFilme from "../../components/BannerFilme/bannerFilme";
import NavegacaoAbas from "../../components/Navegacao/navegacao";
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

        {filme.diretores?.length > 0 && (
          <>
            <h3>Diretor(es)</h3>
            <div className="listaPessoas">
              {filme.diretores.map((d, i) => (
                <div key={i} className="pessoaCard">
                  <img src={getImageUrl(d.foto)} alt={d.nome} />
                  <p>{d.nome}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {filme.atores?.length > 0 && (
          <>
            <h3>Atores</h3>
            <div className="listaPessoas">
              {filme.atores.map((a, i) => (
                <div key={i} className="pessoaCard">
                  <img src={getImageUrl(a.foto)} alt={a.nome} />
                  <p>{a.nome}</p>
                </div>
              ))}
            </div>
          </>
        )}

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
      </div>

      
    </main>
  );
}
