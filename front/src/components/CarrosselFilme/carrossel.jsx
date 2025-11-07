import CardFilme from "../Card/card";
import "./carrossel.css";

function CarrosselFilmes({ titulo, filmes }) {
  return (
    <div className="carrosselContainer">
      <h2>{titulo}</h2>
      <div className="carrosselFilmes">
        {filmes.map((filme, index) => (
          <CardFilme key={index} {...filme} />
        ))}
      </div>
    </div>
  );
}

export default CarrosselFilmes;
