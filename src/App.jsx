import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Idiomas from "./pages/Idiomas";
import Nivel from "./pages/NivelIdioma";
import Motivo from "./pages/MotivoIdioma";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
