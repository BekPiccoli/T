import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/Pergunta.css";
import { useUser } from "../auth/authContext";
import Swal from "sweetalert2";


const Pergunta = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await api.get(`/exercise/${exerciseId}`);
        setExercise(response.data);
      } catch (error) {
        console.error("Erro ao buscar o exercício:", error);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleAnswer = async () => {
    try {
      const correct = selectedAnswer === exercise.correctAnswer;
  
      // Salvar progresso no backend
      await api.post(`/progress`, {
        userId: user.id,
        exerciseId,
        userAnswer: selectedAnswer,
        correct,
      });
  
      // Mostrar alerta com SweetAlert2
      Swal.fire({
        icon: correct ? "success" : "error",
        title: correct ? "Resposta correta!" : "Resposta incorreta!",
        text: correct
          ? "Você acertou, parabéns!"
          : "Infelizmente, essa não é a resposta certa.",
        confirmButtonColor: "#003366",
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
  
      // Exibir erro com SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um problema ao salvar seu progresso. Tente novamente.",
        confirmButtonColor: "#003366",
      });
    }
  };
  

  if (!exercise) return <p>Carregando...</p>;

return (
  <div className="exercise-container">
    <div className="question-container">
      <h1 className="exercise-title">{exercise.content}</h1>
    </div>
    <div className="options">
      {exercise.options.map((option, index) => (
        <div
          key={index}
          className={`option-card ${
            selectedAnswer === option ? "selected" : ""
          }`}
          onClick={() => setSelectedAnswer(option)}
        >
          {option}
        </div>
      ))}
    </div>
    <button
      className="submit-button"
      onClick={handleAnswer}
      disabled={!selectedAnswer}
    >
      Enviar Resposta
    </button>
  </div>
);

}

export default Pergunta;
