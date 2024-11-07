import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Idiomas from "./pages/Idiomas";
import Nivel from "./pages/NivelIdioma";
import Motivo from "./pages/MotivoIdioma";
import Perfil from "./pages/Perfil";
import Atividades from "./pages/Atividades";
import Sobre from "./pages/Sobre";
import Desempenho from "./pages/Desempenho";
import Configuracao from "./pages/Configuracao";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Idiomas" element={<Idiomas />} />
          <Route path="/Nivel" element={<Nivel />} />
          <Route path="/Motivo" element={<Motivo />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Atividades" element={<Atividades />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Desempenho" element={<Desempenho />} />
          <Route path="/Configuracao" element={<Configuracao />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
