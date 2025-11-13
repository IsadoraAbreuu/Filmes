import React, { useEffect, useState } from "react";
import CarrosselPrincipal from "../../components/CarrosselHome/carrosselHome";
import BannerHome from "../../assets/images/banner-home.svg";
import Botao from "../../components/Botao/botao";
import IconeSeta from "../../assets/icons/icone-seta-botao.svg";
import "./home.css";
import FiltroProdutora from "../../components/ListaProdutoras/listaProdutora";
import SecaoFilme from "../../components/SecaoFilme/secao";

function Home() {
  // Estados para cada categoria de filmes
  const [filmesClassicos, setFilmesClassicos] = useState([]);
  const [filmesEmAlta, setFilmesEmAlta] = useState([]);
  const [filmesTop10, setFilmesTop10] = useState([]);
  const [erro, setErro] = useState(null);

  // Função genérica para buscar filmes de um endpoint
  const buscarFilmes = async (endpoint, setState) => {
    try {
      const res = await fetch(`http://localhost:8000${endpoint}`);
      const data = await res.json();

      if (data.status === "ok") {
        setState(data.data);
      } else {
        throw new Error(data.message || "Erro desconhecido ao buscar filmes.");
      }
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
      setErro(err.message);
    }
  };

  // Buscar as seções assim que a página carregar
  useEffect(() => {
    buscarFilmes("/api/filmes_classicos", setFilmesClassicos);
    buscarFilmes("/api/filmes_em_alta", setFilmesEmAlta);
    buscarFilmes("/api/filmes_top10", setFilmesTop10);
  }, []);

  return (
    <>
      <div className="conteudoHome">
        <CarrosselPrincipal />
        <main>
          <SecaoFilme titulo="🔥 Em Alta" filmes={filmesEmAlta} />
          <SecaoFilme titulo="🏆 Top 10" filmes={filmesTop10} />

          {/* Banner de recomendações */}
          <div className="containerRecomendacoes">
            <img src={BannerHome} alt="Banner sobre recomendações de filmes" />
            <Botao
              link="/favoritos"
              texto="Confira seus favoritos"
              iconeSrc={IconeSeta}
            />
          </div>

          <SecaoFilme titulo="🎞️ Clássicos do Cinema" filmes={filmesClassicos} />

        
          {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}
        </main>
        
        
      </div>
    </>
  );
}

export default Home;
