import { useEffect } from "react";
import { api } from "../services/api";
import { useUser } from "../auth/authContext";
import "../styles/Home.css";

function Home() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && !user.primaryLanguage) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${user.id}`);
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao carregar o usuário:", error);
        }
      };
      fetchUser();
    }
  }, [user, setUser]);

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">
          Bem-vindo, {user ? user.name : "Usuário"}!
          <h2>Pronto para aprimorar seu aprendizado de idiomas?</h2>
        </h1>
      </div>
    </>
  );
}

export default Home;
