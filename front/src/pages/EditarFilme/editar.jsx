import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import FormFilme from "../../components/FormFilme/formFilme";

const EditarFilme = () => {
  const { id } = useParams(); // pega o ID do filme da URL
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilme = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/filmes/${id}`);
        if (!res.ok) throw new Error("Filme não encontrado");
        const data = await res.json();
        setFilme(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilme();
  }, [id]);

  const handleAtualizarFilme = (filmeAtualizado) => {
    console.log("Filme atualizado:", filmeAtualizado);
    // redirecionar, ex: window.location.href = "/filmes";
  };

  if (loading) return <p>Carregando filme...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <FormFilme modo="edit" filmeInicial={filme} onSubmit={handleAtualizarFilme} />;
};

export default EditarFilme;
