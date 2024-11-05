import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import "../styles/MenuLateral.css";

function Home() {
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (user) {
      console.log("Usuário atualizado:", user);
    } else {
      console.log("Nenhum usuário encontrado.");
      // Redirecione ou busque o usuário do banco de dados, se necessário
    }
  }, [user]);

  return (
    <div className="MainLayout">
      <MenuLateral />
      <div className="Content">
        <h1>Bem-vindo, {user ? user.name : "Usuário"}</h1>
        <p>Aqui está o conteúdo principal do seu aplicativo.</p>
        <p>Idioma: {user?.primaryLanguage}</p>
        <p>Nível: {user?.level}</p>
        <p>Motivo: {user?.purpose}</p>
      </div>
    </div>
  );
}

export default Home;
