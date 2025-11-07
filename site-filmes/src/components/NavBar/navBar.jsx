import { useState, useEffect, useRef } from 'react'
import './navBar.css'
import lupaPesquisa from '../../assets/icons/lupa-pesquisa.svg'
import { Link } from "react-router-dom";

export default function NavBar() {
  const [lupaAtiva, setLupaAtiva] = useState(false)
  const [lupaFixa, setLupaFixa] = useState(false)
  const navbarRef = useRef(null)

  // fecha a lupa ao clicar fora da navbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setLupaAtiva(false)
        setLupaFixa(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // alterna o estado fixo da lupa
  const handleLupaClick = () => {
    setLupaFixa(!lupaFixa)
    setLupaAtiva(!lupaFixa) // se já estava fixa, fecha
  }

  return (
    <nav
      ref={navbarRef}
      className={`navBar ${lupaAtiva || lupaFixa ? 'lupaAtiva' : ''}`}
    >
      <ul className="containerNav">
        <li className="topicoNav">
          <Link className="rotaNav" to="/home">Home</Link>
        </li>
        <li className="topicoNav">
          <Link className="rotaNav" to="/catalogo">Catálogo</Link>
        </li>
        <li className="topicoNav">
          <Link className="rotaNav" to="/sobre">Sobre</Link>
        </li>
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
      </ul>
    </nav>
  )
}
