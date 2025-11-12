import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import IconeLinkedin from '../../assets/icons/linkedin.svg'
import IconeInstagram from '../../assets/icons/instagram.svg'
import IconeTwitter from '../../assets/icons/twitter.svg'
import IconeFacebook from '../../assets/icons/facebook.svg'

// Componente simples para representar um Ícone de Mídia Social
// Você pode substituir isso por ícones reais (ex: de uma biblioteca como FontAwesome ou React Icons)
const SocialIcon = ({ type, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`social-icon ${type}`}>
        {/* Você pode substituir o {type[0].toUpperCase()} pelo seu ícone SVG ou componente */}
        <span>{type[0].toUpperCase()}</span> 
    </a>
);

export default function Footer() {
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/catalogo', label: 'Catálogo' },
        { path: '/favoritos', label: 'Favoritos' },
        { path: '/adicionar', label: 'Adicionar Filme' },
        { path: '/sobre', label: 'Sobre' },
    ];

    const socialLinks = [
        { type: 'linkedin', url: 'https://www.linkedin.com/' },
        { type: 'instagram', url: 'https://www.instagram.com/' },
        { type: 'twitter', url: 'https://www.twitter.com/' },
        { type: 'facebook', url: 'https://www.facebook.com/' },
    ];

    return (
        <footer className="footerContainer">
            <nav className="footerNav">
                {navLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="footerLink">
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="redesSociais">
                <div className='linkedin'>
                    <img src={IconeLinkedin} alt='Ícone do linkedin' />
                </div>
                <div className='instagram'>
                    <img src={IconeInstagram} alt='Ícone do instagram' />
                </div>
                <div className='twitter'>
                    <img src={IconeTwitter} alt='Ícone do twitter' />
                </div>
                <div className='facebook'>
                    <img src={IconeFacebook} alt='Ícone do facebook' />
                </div>
            </div>

            <p className="footerCopy">
                Desenvolvido com amor &copy; FilHub 2025. Todos os direitos reservados.
            </p>
        </footer>
    );
}