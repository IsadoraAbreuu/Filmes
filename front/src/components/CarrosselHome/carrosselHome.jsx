import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Ícones para navegação
import CardCarrossel from '../CardCarrossel/cardCarrossel'; 
import './carrosselHome.css';
import DiarioPaixao from '../../assets/images/diario-paixao.svg'
import JogosVorazes from '../../assets/images/jogos-vorazes.svg'
import MammaMia from '../../assets/images/mamma-mia.svg'
import HarryPotter from '../../assets/images/harry-potter.svg'
import MinhaMae from '../../assets/images/minha-mae-peca.svg'
import Wicked from '../../assets/images/wicked.svg'
import BarracaBeijo from '../../assets/images/barraca-beijo.svg'

 
const mockFilmesCarrossel = [
    {
        id: 1,
        titulo: 'Diário de uma Paião',
        descricao: 'Uma intensa jornada de amor e esperança, onde lembranças, escolhas e promessas desafiam o esquecimento e a passagem dos anos.',
        capaFundo: DiarioPaixao,
    },
    {
        id: 2,
        titulo: 'Jogos Vorazes',
        descricao: 'É uma emocionante luta pela sobrevivência em um mundo distópico onde coragem e rebeldia desafiam o poder.',
        capaFundo: JogosVorazes,
    },
    {
        id: 3,
        titulo: 'Mamma Mia',
        descricao: 'É uma divertida e vibrante celebração do amor, da amizade e das inesquecíveis músicas do ABBA.',
        capaFundo: MammaMia,
    },
    {
        id: 4,
        titulo: 'Harry Potter',
        descricao: 'É uma mágica jornada de amizade, coragem e descobertas em um mundo cheio de feitiços e mistérios.',
        capaFundo: HarryPotter,
    },
    {
        id: 5,
        titulo: 'Minha mãe é uma Peça',
        descricao: 'É uma comédia cheia de amor e confusão, mostrando as divertidas aventuras de uma mãe que faz de tudo pela família.',
        capaFundo: MinhaMae,
    },
    {
        id: 6,
        titulo: 'Wicked',
        descricao: 'É uma poderosa jornada de magia e destino, onde amizade, coragem e diferenças desafiam o que é considerado bom ou mau.',
        capaFundo: Wicked,
    },
    {
        id: 7,
        titulo: 'A Barra do Beijo',
        descricao: 'É uma divertida e intensa história sobre amizade, escolhas e o primeiro amor — onde um simples beijo pode mudar tudo.',
        capaFundo: BarracaBeijo,
    },
];
 
function CarrosselPrincipal() {
    const [indiceAtivo, setIndiceAtivo] = useState(1); // Começa no segundo filme (índice 1) para ter 2 de cada lado
 
    const proximoSlide = () => {
        setIndiceAtivo((prevIndice) =>
            (prevIndice + 1) % mockFilmesCarrossel.length
        );
    };
 
    const slideAnterior = () => {
        setIndiceAtivo((prevIndice) =>
            (prevIndice - 1 + mockFilmesCarrossel.length) % mockFilmesCarrossel.length
        );
    };
 
    return (
        <div className="carrosselPrincipalContainer">
 
 
            {/* A área onde os cards serão exibidos */}
            <div className="carrosselAreaCards">
                {mockFilmesCarrossel.map((filme, index) => {
                    let className = 'cardCarrosselItem';
                    const diff = (index - indiceAtivo + mockFilmesCarrossel.length) % mockFilmesCarrossel.length;
                   
                    if (index === indiceAtivo) {
                        className += ' ativo';
                    } else if (diff === 1 || diff === 1 - mockFilmesCarrossel.length) { // Próximo (à direita)
                        className += ' proximo';
                    } else if (diff === mockFilmesCarrossel.length - 1 || diff === -1) { // Anterior (à esquerda)
                        className += ' anterior';
                    } else if (diff === 2 || diff === 2 - mockFilmesCarrossel.length) { // Segundo à direita
                        className += ' proximo-distante';
                    } else if (diff === mockFilmesCarrossel.length - 2 || diff === -2) { // Segundo à esquerda
                        className += ' anterior-distante';
                    } else { // Outros cards
                        className += ' escondido';
                    }
 
                    return (
                        <CardCarrossel
                            key={filme.id}
                            filme={filme}
                            className={className}
                            onCardClick={proximoSlide}
                        />
                    );
                })}
            </div>
 
            {/* Indicadores de slide (os pontinhos) */}
            <div className="carrosselIndicadores">
                {mockFilmesCarrossel.map((_, index) => (
                    <span
                        key={index}
                        className={`indicadorPonto ${index === indiceAtivo ? 'ativo' : ''}`}
                        onClick={() => setIndiceAtivo(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}
 
export default CarrosselPrincipal;