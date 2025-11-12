import Claquete from '../../assets/images/claquete-sobrenos.svg';
import IconeEngrenagem from '../../assets/icons/engrenagem-sobrenos.svg';
import IconeLampada from '../../assets/icons/lampada-sobrenos.svg';
import IconeFiltro from '../../assets/icons/filtro-sobrenos.svg'
import Botao from '../../components/Botao/botao'
import IconeSeta from '../../assets/icons/icone-seta-botao.svg'; 
import CarrosselSobre from '../../components/CarrosselSobre/carrosselSobre';
import Contato from '../../components/Contato/contato';
import './sobre.css';

const SobreNos = () => {
    const imagens = [
    'https://preview.redd.it/what-do-you-want-to-see-most-in-avengers-doomsday-v0-flc2pue4pdqf1.jpeg?width=1080&crop=smart&auto=webp&s=4dfe261378adab2a05cd8ed2d87a6939faa8a2f6',
    "https://upload.wikimedia.org/wikipedia/pt/b/b3/Inside_Out_2.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi9RGZRW3XFMgb88VawkDAsWKOKxSTuGZFJVakH4YQuEd7YTeH6tJDjKfPML7Xkvr4FLM&usqp=CAU",
    "https://br.web.img2.acsta.net/pictures/210/022/21002261_20130429232702952.jpg",
    ];

    return (
        <>
        <main>
            <div className="backgroundSobreNos">
                <div className="bannerSobreNos">
                    <h1>Cinema ao Seu Alcance:</h1>
                    <h2>Explore, Filtre e Contribua</h2>
                    <p>Encontre, filtre e adicione seus filmes favoritos de forma rápida e fácil. 
                        No <span>FilHub</span> a experiência de explorar cinema é totalmente personalizada e divertida!</p>
                    <img src={Claquete} alt='Imagem de Claquete de filme' />
                </div>

                <div className='funcionalidadesSobreNos'>
                    <h2>A Magia por Trás da Tela</h2>
                    <div className='containerCards'>
                        <div className='cardFiltro'>
                            <img src={IconeFiltro} alt='Ícone de engrenagem' />
                            <h5>Filtros inteligentes</h5>
                            <p>por genêro, produtora, diretor e ator</p>
                        </div>
                        <div className='cardLampada'>
                            <img src={IconeLampada} alt='Ícone de lampada' />
                            <h5>Recomendações personalizadas</h5>
                            <p>baseado em seus filmes favoritos</p>
                        </div>
                        <div className='cardEngrenagem'>
                            <img src={IconeEngrenagem} alt='Ícone de lampada' />
                            <h5>Gerenciamento de filmes</h5>
                            <p>edição de filmes e adição de novos </p>
                        </div>
                    </div>
                </div>

                <div className='carrosselHover'>
                    <CarrosselSobre imagens={imagens} />
                    <div className='carrosselEscrito'>
                        <h2>Pronto para explorar <br />os filmes?</h2>
                        <p>Descubra um universo de filmes incríveis! Se quer fazer parte dessa experiência, venha explorar o site agora!</p>
                        <Botao
                        link="/catalogo"
                        texto="Clique aqui para conhecer"
                        iconeSrc={IconeSeta}
                        />
                    </div>
                </div>
                <div className='contatoContainer'>
                    <Contato />
                </div>
            </div>
        </main>

    
        </>
    )
}

export default SobreNos;