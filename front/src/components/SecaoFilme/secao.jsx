import React, { useRef, useState, useEffect } from "react"; // Adicione useEffect se for usar window.innerWidth
import CardFilme from "../Card/card";
import "./secao.css";

export default function SecaoFilme({ titulo, filmes = [] }) {
    const listaFilmesRef = useRef(null);
    const [indice, setIndice] = useState(0);

    // Você pode tornar este dinâmico com um useEffect para responsividade,
    // mas por enquanto, manteremos fixo para 4 cards visíveis no cálculo principal.
    const CARDS_VISIVEIS = 4; 

    // Calcula o índice máximo de rolagem
    const maxIndice = Math.max(0, filmes.length - CARDS_VISIVEIS);
    
    // ------------------------------------------------------------------
    // CÁLCULOS DINÂMICOS LEVANDO EM CONTA O GAP
    // ------------------------------------------------------------------

    // Assuma o valor do gap do CSS para cálculos JS.
    // É uma boa prática, mas se precisar ser super preciso,
    // você precisaria ler a variável CSS em tempo de execução.
    // Para simplificar, vamos hardcodar o valor do gap usado no CSS.
    const GAP_REM_VALUE = 1.5; // Corresponde a var(--gap-carrossel)
    const REM_TO_PX = 16; // Assumindo font-size padrão de 16px para 1rem
    const GAP_PX = GAP_REM_VALUE * REM_TO_PX;

    // A largura de CADA CARD + GAP que ele ocupa (em % da largura do carrosselContainer)
    // Ex: para 4 cards visíveis, cada um ocupa 25% da largura do contêiner visível.
    // Mas como o flex-basis já está definido no CSS, precisamos focar no translateX.
    
    // O transform precisa mover o equivalente à largura de 1 CARD + 1 GAP completo
    // A porcentagem de 1 card visível dentro da `carrosselContainer` é `100 / CARDS_VISIVEIS`.
    // O problema anterior era o `wrapperCard` ser 100 / CARDS_VISIVEIS de `listaFilmes`,
    // quando ele deveria ser 100 / TOTAL_DE_FILMES da `listaFilmes`.

    // O scrollOffset deve mover exatamente a largura de UMA VISÃO COMPLETA (1 card + 1 gap)
    // Para fazer isso corretamente com `translateX(%)`, a largura do `.listaFilmes`
    // precisa ser calculada de forma que a porcentagem de cada item seja correta.

    // Vamos recalcular o scrollOffset para mover a porcentagem de 1 card visível no carrosselContainer
    const scrollOffset = -(indice * (100 / CARDS_VISIVEIS));
    // E deixar a largura do `.listaFilmes` para flexbox lidar se o flex-basis estiver correto.
    // Se o `wrapperCard` tem `flex: 0 0 calc((100% / 4) - var(--gap-carrossel) * 3 / 4)`,
    // então a `width` do `listaFilmes` não precisa ser dinamicamente calculada
    // como antes (`(filmes.length / CARDS_VISIVEIS) * 100`).
    // Ela pode ser `auto` e o flexbox se encarrega.

    // Vamos simplificar o JSX para não precisar de 'width' no 'listaFilmes' se o flex-basis estiver certo.

    // ------------------------------------------------------------------

    const scrollLeft = () => {
        setIndice((prev) => Math.max(prev - 1, 0));
    };

    const scrollRight = () => {
        setIndice((prev) => Math.min(prev + 1, maxIndice));
    };

    return (
        <section className="secaoDeFilmes">
            <div className="cabecalhoSecao">
                <h2>{titulo}</h2>
                <div className="navegacaoSetas">
                    <button
                        className="botaoSeta esquerda"
                        onClick={scrollLeft}
                        disabled={indice === 0}
                        style={{ opacity: indice === 0 ? 0.4 : 1 }}
                    >
                        &lt;
                    </button>
                    <button
                        className="botaoSeta direita"
                        onClick={scrollRight}
                        disabled={indice >= maxIndice}
                        style={{ opacity: indice >= maxIndice ? 0.4 : 1 }}
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <div className="carrosselContainer">
                <div
                    className="listaFilmes"
                    style={{
                        // O 'width' do listaFilmes pode ser removido, o flexbox se encarrega
                        // uma vez que os wrapperCards têm flex-basis definido.
                        // O transform é para mover a "janela" de visualização.
                        transform: `translateX(${scrollOffset}%)`, 
                        // 'transition' já está no CSS
                    }}
                    ref={listaFilmesRef}
                >
                    {filmes.map((filme, index) => (
                        <div
                            className="wrapperCard"
                            key={index}
                            // O 'flex' inline também pode ser removido, pois o CSS já o define.
                            // Isso simplifica o JSX e centraliza o controle de tamanho no CSS.
                        >
                            <CardFilme
                                poster={filme.poster}
                                titulo={filme.titulo}
                                avaliacao={filme.avaliacao}
                                ano={filme.ano}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}