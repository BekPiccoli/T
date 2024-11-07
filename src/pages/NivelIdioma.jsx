import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../auth/authContext.jsx";

function Nivel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser(); 
  const { selectedLanguage} = location.state || {};
  const [selectedLevel, setSelectedLevel] = useState("");

  //isso é um teste
  // Lista de níveis com o formato correto para o enum do backend
  const levels = [
    { label: "Iniciante", value: "INICIANTE" },
    { label: "Intermediário", value: "INTERMEDIARIO" },
    { label: "Avançado", value: "AVANCADO" },
  ];

  function handleLevelSelect(levelValue) {
    setSelectedLevel(levelValue); // Armazena apenas o valor, não o objeto inteiro
  }

  function handleContinue() {
    if (!selectedLevel) {
      alert("Por favor, selecione seu nível.");
      return;
    }

    console.log("Usuário e Nível", user);
    if (!user) {
      alert("Erro ao recuperar informações do usuário.");
      return;
    }

    navigate("/Motivo", { state: { selectedLanguage, selectedLevel, user } });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-10 text-blue-800 text-center">Escolha seu Nível de {selectedLanguage}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {levels.map((level) => (
          <div
            key={level.value}
            onClick={() => handleLevelSelect(level.value)}
            className={`p-8 flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
              selectedLevel === level.value ? "bg-blue-600 text-white" : "bg-white text-blue-800"
            }`}
          >
            <span className="text-2xl font-semibold">{level.label}</span>
          </div>
        ))}
      </div>
      <button onClick={handleContinue} className="bg-blue-600 text-white px-10 py-3 rounded-md text-lg hover:bg-blue-700">
        Continuar
      </button>
    </div>
  );
}

export default Nivel;
