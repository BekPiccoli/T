import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../auth/authContext";
import "../styles/Desempenho.css";

const Desempenho = () => {
  const { user } = useUser();
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        if (!user || !user.id) {
          console.error("Erro: Usuário ou ID do usuário não definido.");
          return;
        }

        const response = await api.get(`/performance/${user.id}`);
        setPerformance(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar desempenho:", error);
      }
    };

    fetchPerformance();
  }, [user]);

  return (
    <div className="performance-container">
      <h1 className="title">Desempenho do Usuário</h1>
      {performance.length > 0 ? (
        performance.map((languageData, index) => (
          <div key={index} className="language-section">
            <h2 className="language-title">{languageData.language}</h2>
            <div className="groups-list">
              {languageData.groups.map((group, groupIndex) => (
                <div key={groupIndex} className="group-card">
                  <h3>{group.groupName}</h3>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${group.progressPercentage}%`,
                      }}
                    ></div>
                  </div>
                  <p>
                    {group.progressPercentage}% concluído (
                    {group.correctExercises}/{group.totalExercises})
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-progress">Nenhum progresso disponível.</p>
      )}
    </div>
  );
};

export default Desempenho;
