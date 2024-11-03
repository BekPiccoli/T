import React from "react";
import { useLocation } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import "../styles/MenuLateral.css";

function Home() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="MainLayout">
      <MenuLateral />
      <div className="Content">
        <h1>Bem-vindo, {user ? user.name : "Usuário"}</h1>
        <p>Aqui está o conteúdo principal do seu aplicativo.</p>
      </div>
    </div>
  );
}

export default Home;
