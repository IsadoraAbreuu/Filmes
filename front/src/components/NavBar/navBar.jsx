import { useState, useEffect, useRef } from 'react'
import './navBar.css'
import { Link } from "react-router-dom"
import SearchLupa from '../Lupa/lupa'

export default function NavBar() {
  const [lupaAtiva, setLupaAtiva] = useState(false)
  const [lupaFixa, setLupaFixa] = useState(false)
  const navbarRef = useRef(null)

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
        <SearchLupa
          lupaAtiva={lupaAtiva}
          lupaFixa={lupaFixa}
          setLupaAtiva={setLupaAtiva}
          setLupaFixa={setLupaFixa}
        />
      </ul>
    </nav>
  )
}