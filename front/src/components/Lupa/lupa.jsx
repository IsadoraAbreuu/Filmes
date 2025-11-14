import React from 'react'
import lupaPesquisa from '../../assets/icons/lupa-pesquisa.svg' 
import '../NavBar/navBar.css' 

export default function SearchLupa({ lupaAtiva, lupaFixa, setLupaFixa, setLupaAtiva }) {
  
  const handleLupaClick = () => {
    setLupaFixa(!lupaFixa)
    setLupaAtiva(!lupaFixa) // se já estava fixada la em cima, fecha
  }

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
        <input type="text" placeholder="Pesquisar..." />
      </div>
    </li>
  )
}