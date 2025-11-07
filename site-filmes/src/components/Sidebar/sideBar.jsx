import './sideBar.css'
import CasaGradiente from '../../assets/icons/casa-gradiente.svg'
import Catalogo from '../../assets/icons/catalogo-branco.svg'
import Favoritos from '../../assets/icons/favoritos-branco.svg'
import Adicionar from '../../assets/icons/adicionar-branco.svg'
import Logout from '../../assets/icons/logout.svg'
import RestoLogo from '../../assets/images/resto-logo.svg'
import Flogo from '../../assets/images/flogo.svg'
import { Link } from "react-router-dom";    

export default function SideBar() {
    return (
        <nav className="sideBar">
        <ul className='containerSide'>
            <li className='topicoSide'>
                <Link className='rotaSide' to="/home">
                    <img className='FlogoSide' src={Flogo} alt='Apenas o F da logo do FilHub'/>
                    <span><img className='logoSide' src={RestoLogo} alt='Logo do FilHub'/></span>
                </Link>
            </li>
            <li className='topicoSide'>
                <Link className='rotaSide' to="/home">
                    <img src={CasaGradiente} alt='Casa'/>
                    <span>Home</span>
                </Link>
            </li>
            <li className='topicoSide'>
                <Link className='rotaSide' to="/catalogo">
                    <img src={Catalogo} alt='Camera de filme'/>
                    <span>Catalogo</span>
                </Link>
            </li>
            <li className='topicoSide'>
                <Link className='rotaSide' to="/favoritos">
                    <img src={Favoritos} alt='Coração'/>
                    <span>Favoritos</span>
                </Link>
            </li>
            <li className='topicoSide'>
                <Link className='rotaSide' to="/adicionar">
                    <img src={Adicionar} alt='Ícone com mais de adicionar'/>
                    <span>Adicionar</span>
                </Link>
            </li>
            <li className='topicoSide'>
                <Link className='rotaSide' to="/logout">
                    <img src={Logout} alt='Saindo da porta'/>
                    <span>Logout</span>
                </Link>
            </li>
        </ul>
    </nav>
    )
    
}