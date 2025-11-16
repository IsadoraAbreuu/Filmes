import React from "react";
import { useNavigate } from "react-router-dom";
import FormFilme from "../../components/FormFilme/formFilme";

const AdicionarFilme = () => {
  const navigate = useNavigate();

  const handleNovoFilme = (filme) => {
    console.log("Solicitação de filme enviada:", filme);
    // Redireciona APÓS a submissão bem-sucedida
    navigate("/catalogo"); 
  };

  return (
    <>
      <FormFilme modo="add" onSubmit={handleNovoFilme} />;
    </>
  )
};

export default AdicionarFilme;
