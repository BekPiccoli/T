import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Idiomas from "./pages/Idiomas";
import Nivel from "./pages/NivelIdioma";
import Motivo from "./pages/MotivoIdioma";
import GrupoAtividade from "./pages/GrupoAtividade";
import MainLayout from "./layouts/LayoutMenuLateral";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Nivel" element={<Nivel />} />
          <Route path="/Motivo" element={<Motivo />} />
          <Route path="/Idiomas" element={<Idiomas />} />
        {/* Rotas com a Sidebar via MainLayout */}
        <Route
          path="/Home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/GrupoAtividade"
          element={
            <MainLayout>
              <GrupoAtividade />
            </MainLayout>
          }
        />
      </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
