import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useUser } from "../auth/authContext";
import "../styles/Exercicios.css";

const Exercicios = () => {
  const { groupId } = useParams();
  const { user } = useUser();
  const [exercises, setExercises] = useState([]);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercisesAndProgress = async () => {
      try {
        const exercisesResponse = await api.get(`/exercises/${groupId}`);
        setExercises(exercisesResponse.data.exercises || []);

        console.log(groupId);
        const progressResponse = await api.get(`/progress/${groupId}/${user.id}`);
        console.log(progressResponse.data);
        const progressData = progressResponse.data.reduce((acc, curr) => {
          acc[curr.exerciseId] = curr;
          return acc;
        }, {});
        console.log(progressData);

        setProgress(progressData);
      } catch (error) {
        console.error("Erro ao carregar exercícios ou progresso:", error);
      }
    };

    fetchExercisesAndProgress();
  }, [groupId]);

  const getExerciseStatus = (exerciseId) => {
    const exerciseProgress = progress[exerciseId];
    if (!exerciseProgress) return "pendente";
    return exerciseProgress.correct == true ? "correto" : "incorreto";
  };

  return (
    <div className="exercises-container">
      <h1 className="title">Exercícios do Grupo</h1>
      <div className="exercises-list">
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <h2>{exercise.content}</h2>
              <span className={`status ${getExerciseStatus(exercise.id)}`}>
                {getExerciseStatus(exercise.id) === "correto"
                  ? "✅ Respondido corretamente"
                  : getExerciseStatus(exercise.id) === "incorreto"
                  ? "❌ Respondido incorretamente"
                  : "⬜ Não respondido"}
              </span>
              <button
                className="start-button"
                onClick={() => navigate(`/exercicio/${exercise.id}`)}
              >
                Começar
              </button>
            </div>
          ))
        ) : (
          <p className="no-exercises">Nenhum exercício disponível.</p>
        )}
      </div>
    </div>
  );
};

export default Exercicios;
