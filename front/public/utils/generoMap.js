// Use os nomes EXATOS que vêm do seu banco de dados
export const ICONE_MAP = {
    "Ação": "/icons/acao-filtro.svg",
    "Romance": "/icons/romance-filtro.svg",
    "Terror": "front/src/assets/icons/terror-filtro.svg",
    "Musical": "front/src/assets/icons/musical-filtro.svg",
    "Animação": "front/src/assets/icons/animacao-filtro.svg",
    "Histórico": "front/src/assets/icons/historico-filtro.svg",
    "Western": "front/src/assets/icons/western-filtro.svg",
};

// Funçao auxiliar para formatar a lista
export const formatarGenerosParaCarrossel = (generosBrutos) => {
    // 1. Adiciona o filtro "Todos" no início
    const listaFormatada = [{
        id: 0,
        label: "Todos",
        icone: "/icons/todos-filtro.svg" 
    }];

    // 2. Mapeia os dados brutos e adiciona o icone
    const generosMapeados = generosBrutos.map(g => ({
        id: g._id,
        label: g.nome, // `label` é o que o FilterCard usa
        icone: ICONE_MAP[g.nome] || "/assets/default.png" // Fallback se não encontrar
    }));

    // 3. Junta tudo
    return listaFormatada.concat(generosMapeados);
};