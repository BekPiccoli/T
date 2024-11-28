import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Idiomas from "./pages/Idiomas";
import Nivel from "./pages/NivelIdioma";
import Motivo from "./pages/MotivoIdioma";
import GrupoAtividade from "./pages/GrupoAtividade";
import MainLayout from "./layouts/LayoutMenuLateral";
import Perfil from "./pages/Perfil";
import Desempenho from "./pages/Desempenho";
import Sobre from "./pages/Sobre";
import Exercicios from "./pages/Exercicios";
import Pergunta from "./pages/Pergunta";


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
          <Route
            path="/Desempenho"
            element={
              <MainLayout>
                <Desempenho />
              </MainLayout>
            }
          />
          <Route
            path="/Sobre"
            element={
              <MainLayout>
                <Sobre />
              </MainLayout>
            }
          />
          <Route
            path="/Perfil"
            element={
              <MainLayout>
                <Perfil />
              </MainLayout>
            }
          />
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
          <Route
            path="/exercises/:groupId"
            element={
              <MainLayout>
                <Exercicios />
              </MainLayout>
            }
          />
          <Route
            path="/exercicio/:exerciseId"
            element={
            <MainLayout>
            <Pergunta />
            </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
