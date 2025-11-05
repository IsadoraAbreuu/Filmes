import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar/navBar'
import SideBar from './components/Sidebar/sideBar'
import Login from './pages/Login/login'
import Cadastro from './pages/Cadastro/cadastro'
import CardFilme from './components/Card/card'

function App() {

   const filme = {
    poster: "https://m.media-amazon.com/images/I/81aA7hEEykL._AC_SL1500_.jpg",
    titulo: "Toy Story",
    avaliacao: "4.9",
    ano: "1995",
  };
  

  return (
     <div style={{ padding: "2rem", background: "#1e1e1e", minHeight: "100vh" }}>
      <CardFilme
        poster={filme.poster}
        titulo={filme.titulo}
        avaliacao={filme.avaliacao}
        ano={filme.ano}
      />
    </div>

    

  )
}

export default App
