import React, { useEffect, useState } from "react";
import { useUser } from "../auth/authContext.jsx";
import { api } from "../services/api.js";
import "../styles/GrupoAtividade.css";
import { useNavigate } from "react-router-dom";

const GrupoAtividade = () => {
  const [exerciseGroups, setExerciseGroups] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const selectedLanguage = user?.primaryLanguage || "defaultLanguage";

  const gradientColors = [
    "linear-gradient(to right, #2728c0, #4f5bd5)",
    "linear-gradient(to right, #ff7e5f, #feb47b)",
    "linear-gradient(to right, #43cea2, #185a9d)",
    "linear-gradient(to right, #ff6a00, #ee0979)",
    "linear-gradient(to right, #56ccf2, #2f80ed)"
  ];

  // Função para obter uma cor aleatória
  const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradientColors.length);
    return gradientColors[randomIndex];
  };

  useEffect(() => {
    const fetchExerciseGroups = async () => {
      try {
        const response = await api.get(`/exercisesGroup?language=${selectedLanguage}`);
        setExerciseGroups(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar grupos de exercícios:", error);
      }
    };

    fetchExerciseGroups();
  }, [selectedLanguage]);

  const handleViewExercises = (groupId) => {
    console.log("Group ID recebido:", groupId);

    navigate(`/exercises/${groupId}`);
  };


  return (
    <div className="exercise-groups-container">
      <h1 className="title">Grupos de Exercícios - {selectedLanguage}</h1>
      <div className="exercise-groups-grid">
        {exerciseGroups.map((group) => (
          <div key={group.id} className="exercise-card">
            <div
              className="exercise-card-header"
              style={{ background: getRandomGradient() }} 
            ></div>
            <div className="exercise-card-content">
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <button
                className="view-button"
                onClick={() => handleViewExercises(group.id)}
              >
                Ver Atividades
              </button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrupoAtividade;

