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

// 🔹 Layout com Navbar e Sidebar
function LayoutPrincipal() {
  return (
    <div className="appLayout">
      <SideBar />
      <div className="conteudo">
        <NavBar />
        <div className="pagina">
          <Outlet /> {/* Onde as páginas serão renderizadas */}
        </div>
      </div>
    </div>
  );
}

// 🔹 Rotas principais
function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/adicionarFilme" element={<AdicionarFilme />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/editarFilme" element={<EditarFilme />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
