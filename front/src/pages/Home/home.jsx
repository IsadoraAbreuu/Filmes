import CarrosselFilmes from "../../components/CarrosselFilme/carrossel";

const Home = () => {
      const classicos = [
    {
      poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1024_.jpg",
      titulo: "Interstellar",
      avaliacao: "4.8",
      ano: "2014",
    },
    {
      poster: "https://m.media-amazon.com/images/I/81aA7hEEykL._AC_SL1500_.jpg",
      titulo: "Titanic",
      avaliacao: "4.9",
      ano: "1997",
    },
    {
      poster: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg",
      titulo: "O Poderoso Chefão",
      avaliacao: "4.9",
      ano: "1972",
    },
    {
      poster: "https://m.media-amazon.com/images/I/81s6DUyQCZL._AC_SL1500_.jpg",
      titulo: "Clube da Luta",
      avaliacao: "4.8",
      ano: "1999",
    },
    
  ];

  return (
    <main>
    <div>
      <CarrosselFilmes titulo="Clássicos do Cinema" filmes={classicos} />
    </div>
    </main>
  );
}


export default Home;