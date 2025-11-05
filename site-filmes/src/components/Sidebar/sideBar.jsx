import './sideBar.css'
import CasaGradiente from '../../assets/casa-gradiente.svg'
import Catalogo from '../../assets/catalogo-branco.svg'
import Favoritos from '../../assets/favoritos-branco.svg'
import Adicionar from '../../assets/adicionar-branco.svg'
import Logout from '../../assets/logout.svg'
import RestoLogo from '../../assets/resto-logo.svg'
import Flogo from '../../assets/flogo.svg'

export default function SideBar() {
    return (
        <nav className="sideBar">
        <ul className='containerSide'>
            <li className='topicoSide'>
                <a className='rotaSide' href="/home">
                    <img className='FlogoSide' src={Flogo} alt='Apenas o F da logo do FilHub'/>
                    <span><img className='logoSide' src={RestoLogo} alt='Logo do FilHub'/></span>
                </a>
            </li>
            <li className='topicoSide'>
                <a className='rotaSide' href="/home">
                    <img src={CasaGradiente} alt='Casa'/>
                    <span>Home</span>
                </a>
            </li>
            <li className='topicoSide'>
                <a className='rotaSide' href="/catalogo">
                    <img src={Catalogo} alt='Camera de filme'/>
                    <span>Catalogo</span>
                </a>
            </li>
            <li className='topicoSide'>
                <a className='rotaSide' href="/favoritos">
                    <img src={Favoritos} alt='Coração'/>
                    <span>Favoritos</span>
                </a>
            </li>
            <li className='topicoSide'>
                <a className='rotaSide' href="/adicionar">
                    <img src={Adicionar} alt='Ícone com mais de adicionar'/>
                    <span>Adicionar</span>
                </a>
            </li>
            <li className='topicoSide'>
                <a className='rotaSide' href="/logout">
                    <img src={Logout} alt='Saindo da porta'/>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </nav>
    )
    
}