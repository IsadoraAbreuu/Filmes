import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import lupaPesquisa from '../../assets/icons/lupa-pesquisa.svg'
import '../NavBar/navBar.css'

export default function SearchLupa({ lupaAtiva, lupaFixa, setLupaFixa, setLupaAtiva }) {

  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLupaClick = () => {
    setLupaFixa(!lupaFixa);
    setLupaAtiva(!lupaFixa);
  };

  // 🔎 Buscar automaticamente com debounce
  useEffect(() => {
    if (!query || query.trim() === "") {
      setResultados([]);
      setShowDropdown(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {

      const url = `http://localhost:8000/api/pesquisar?q=${encodeURIComponent(query)}`;

      // Segurança extra contra URLs quebradas
      if (!url.startsWith("http://")) {
        console.warn("URL inválida antes do fetch:", url);
        return;
      }

      fetch(url, { signal: controller.signal })
        .then(async res => {
            // Trata erros HTTP (4xx e 5xx)
            if (!res.ok) {
                console.error("Erro de Status HTTP:", res.status, res.statusText);
                const errorData = await res.json();
              throw new Error(JSON.stringify(errorData));
            }
            return res.json();
        })
        .then(data => {
            // Log para ver o que veio
            console.log("Dados recebidos:", data); 
            
            const newResults = Array.isArray(data.data) ? data.data : [];
            setResultados(newResults);
            
            // Só mostra o dropdown se houver resultados
            if (newResults.length > 0) {
                setShowDropdown(true);
            } else {
                setShowDropdown(false); 
            }
        })
        .catch(err => {
          if (err.name !== "AbortError") {
            console.error("Erro na pesquisa:", err);
          }
        });

    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };

  }, [query]);

  const handleSelect = (id) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/filme/${id}`);
  };

  return (
    <li className="topicoNav">
      <div
        className={`lupaContainer ${lupaAtiva || lupaFixa ? 'ativo' : ''}`}
        onMouseEnter={() => !lupaFixa && setLupaAtiva(true)}
        onMouseLeave={() => !lupaFixa && setLupaAtiva(false)}
        onClick={handleLupaClick}
      >
        <div className="iconeLupa">
          <img src={lupaPesquisa} alt="ícone de busca" />
        </div>

        <input
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setShowDropdown(true)}
        />

        {/* 🔽 DROPDOWN */}
        {showDropdown && resultados.length > 0 && (
          <ul className="dropdown-busca">

            {resultados.map((filme) => (
              <li key={filme.id_filme} onClick={() => handleSelect(filme.id_filme)}>

                {/* APENAS O NOME DO FILME */}
                <strong>{filme.titulo}</strong>
              </li>
            ))}

          </ul>
        )}
      </div>
    </li>
  );
}