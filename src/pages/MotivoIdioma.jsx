import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api.js";

function Motivo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLanguage, selectedLevel, user } = location.state || {};
  const [purpose, setPurpose] = useState("");

  const purposes = ["Viagem", "Trabalho", "Interesse Pessoal", "Estudos"];

  async function handleContinue() {
    if (!purpose) {
        alert("Por favor, selecione o motivo.");
        return;
      }
    
      console.log("Usuário Motivo", user);
      if (!user) {
        alert("Erro ao recuperar informações do usuário.");
        return;
      }
    try {
      // Salvar idioma, nível e propósito via API
      await api.post(`/users/${user.id}/languages`, {
        language: selectedLanguage,
        level: selectedLevel,
        purpose: purpose,
      });

      // Redirecionar para a página principal
      navigate("/Home", { state: { user } });
    } catch (error) {
      console.error("Erro ao salvar idioma:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-10 text-blue-800 text-center">Qual o motivo para estudar {selectedLanguage}?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {purposes.map((reason) => (
          <div
            key={reason}
            onClick={() => setPurpose(reason)}
            className={`p-8 flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
              purpose === reason ? "bg-blue-600 text-white" : "bg-white text-blue-800"
            }`}
          >
            <span className="text-2xl font-semibold">{reason}</span>
          </div>
        ))}
      </div>
      <button onClick={handleContinue} className="bg-blue-600 text-white px-10 py-3 rounded-md text-lg hover:bg-blue-700">
        Continuar
      </button>
    </div>
  );
}

export default Motivo;
