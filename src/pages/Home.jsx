import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useUser } from "../auth/authContext";
import "../styles/Home.css";

function Home() {
  const { user, setUser } = useUser();
  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState(0);
  const [lastGroup, setLastGroup] = useState(null);
  const [hasPendingQuestions, setHasPendingQuestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerformance = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/progress/overall/${user.id}`);
          setProgress(response.data.overallProgress);
        } catch (error) {
          console.error("Erro ao buscar desempenho:", error);
        }
      }
    };

    const fetchStreak = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/updateStreakOnLogin/${user.id}`);
          setStreak(response.data.streak);
        } catch (error) {
          console.error("Erro ao buscar streak:", error);
        }
      }
    };

    const checkAndSetGoal = async () => {
      if (user && !user.dailyGoal) {
        const { value: dailyGoal } = await Swal.fire({
          title: "Defina sua meta diária",
          input: "number",
          inputLabel: "Quantos minutos você quer estudar por dia?",
          inputPlaceholder: "Exemplo: 15",
          confirmButtonText: "Salvar",
          inputValidator: (value) => {
            if (!value || value < 1) {
              return "Por favor, insira uma meta válida.";
            }
          },
        });

        if (dailyGoal) {
          try {
            const parsedGoal = parseInt(dailyGoal);
            await api.patch(`/usersGoal/${user.id}/daily-goal`, { dailyGoal: parsedGoal });
            setUser((prev) => ({ ...prev, dailyGoal }));
          } catch (error) {
            console.error("Erro ao salvar meta:", error);
          }
        }
      }
    };

    const fetchLastGroupProgress = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/progressGroup/lastGroup/${user.id}`);
          const { lastGroup, hasPendingQuestions } = response.data;

          setLastGroup(lastGroup);
          setHasPendingQuestions(hasPendingQuestions);
        } catch (error) {
          console.error("Erro ao buscar progresso do último grupo:", error);
        }
      }
    };

    fetchPerformance();
    fetchStreak();
    checkAndSetGoal();
    fetchLastGroupProgress();
  }, [user, setUser]);

  const handleContinue = () => {
    if (lastGroup) {
      navigate(`/exercises/${lastGroup.id}`);
    }
  };

  const handleNextStudy = () => {
    navigate(`/GrupoAtividade`);
  };

  return (
    <div className="home-container">
  <div className="home-header">
    <h1 className="home-title">
      Bem-vindo, <span className="user-name">{user?.name || "Usuário"}</span>!
    </h1>
    <h2 className="home-subtitle">Que tal continuar aprendendo hoje?</h2>
  </div>

  {progress !== null && (
    <div className="progress-card">
      <h3 className="progress-text">
        Você completou <span className="progress-value">{progress}%</span> do seu aprendizado!
      </h3>
      <div className="progress-bar-home">
        <div
          className="progress-bar-inner"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )}

  <div className="action-section">
    {lastGroup && (
      <>
        {hasPendingQuestions ? (
          <div className="action-card" onClick={handleContinue}>
            <h3 className="action-card-title">Continuar por onde parou</h3>
            <p className="action-card-description">
              Complete as perguntas restantes no grupo{" "}
              <span className="action-highlight">{lastGroup.name}</span>.
            </p>
          </div>
        ) : (
          <div className="action-card" onClick={handleNextStudy}>
            <h3 className="action-card-title">Dar sequência nos estudos</h3>
            <p className="action-card-description">
              Comece novos desafios e avance ainda mais no aprendizado.
            </p>
          </div>
        )}
      </>
    )}

    <div className="action-card streak-card">
      <h3 className="action-card-title">Meta diária</h3>
      <p className="action-card-description">
        Você está há <span className="action-highlight">{streak}</span> dias consecutivos cumprindo sua meta diária!
      </p>
    </div>
  </div>
</div>
  );
}

export default Home;
