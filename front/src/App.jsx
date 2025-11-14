import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/navBar";
import SideBar from "./components/Sidebar/sideBar";
import Home from "./pages/Home/home";
import Catalogo from "./pages/Catalogo/catalogo";
import Favoritos from "./pages/Favoritos/favoritos";
import AdicionarFilme from "./pages/AdicionarFilme/adicionar";
import SobreNos from "./pages/SobreNos/sobre";
import EditarFilme from "./pages/EditarFilme/editar";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro";
import "./App.css";
import Notificacao from "./components/Notificacao/notificacao";
import User from "./components/User/user";
import Descricao from './pages/Descricao/descricao'
import Footer from "./components/Footer/footer";
import FilmeEspecifico from "./pages/FilmeEspecifico/filmeEspecifico";
import NavegacaoAbas from "./components/Navegacao/navegacao";
import FilmeDetalhe from "./components/FilmeDetalhes/fillmeDetalhes";
import AdministradorDashboard from "./pages/Administrador/administrador";

// layout com Navbar e Sidebar
function LayoutPrincipal() {
  return (
    <div className="appLayout">
      <SideBar />
      <div className="conteudo">
        <NavBar />
        <Notificacao />
        <User nome="Heloisa" tipo="Comum" />
        <div className="pagina">
          <Outlet /> {/* Onde as páginas serão renderizadas */}
          <Footer />
        </div>
      </div>
    </div>
    
  );
}

// as rotas principais
function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/adicionar" element={<AdicionarFilme />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/adm" element={<AdministradorDashboard />} />
          

          <Route path="/filme/:id" element={<FilmeDetalhe />}>
                        
              {/* Rota Index: Conteúdo da Descrição */}
              <Route index element={<Descricao />} /> 
              
              {/* Rota Edição: Conteúdo do Formulário */}
              <Route path="editar" element={<EditarFilme />} /> 
              
          </Route>

        </Route>

        <Route path="/logout" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
