import './navBar.css'
import lupaPesquisa from '../../assets/lupa-pesquisa.svg'

export default function NavBar() {
    return (
        <nav className="navBar">
        <ul className='containerNav'>
            <li className='topicoNav'>
                <a className='rotaNav' href="/home">Home</a>
            </li>
            <li className='topicoNav'>
                <a className='rotaNav' href="/catalogo">Catálogo</a>
            </li>
            <li className='topicoNav'>
                <a className='rotaNav' href="/sobre">Sobre</a>
            </li>
            <li className='topicoNav'>
                <a className='rotaNavLupa' href="/pesquisa">
                    <img className='iconeLupa' src={lupaPesquisa} alt='Lupa de pesquisa'/>
                </a>
            </li>
        </ul>
    </nav>
    )
    
}