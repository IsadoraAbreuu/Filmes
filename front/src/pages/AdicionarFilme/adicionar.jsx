import React from "react";
import FormFilme from "../../components/FormFilme/formFilme";

const AdicionarFilme = () => {
  const handleNovoFilme = (filme) => {
    console.log("Filme adicionado:", filme);
    // aqui você pode redirecionar para a lista de filmes, ex:
    // window.location.href = "/filmes";
  };

  return <FormFilme modo="add" onSubmit={handleNovoFilme} />;
};

export default AdicionarFilme;
