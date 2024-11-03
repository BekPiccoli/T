// src/pages/SelectLanguage.js
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SelectLanguage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const user = location.state?.user; 

  const availableLanguages = [
    { name: "Inglês", code: "en", flag: "🇬🇧" },
    { name: "Espanhol", code: "es", flag: "🇪🇸" },
  ];

  function handleLanguageSelect(language) {
    setSelectedLanguage(language);
  }

  function handleContinue() {
    if (!selectedLanguage) {
      alert("Por favor, selecione um idioma.");
      return;
    }
    navigate("/Nivel", { state: { selectedLanguage , user} });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-10 text-blue-800 text-center">Escolha seu Idioma</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {availableLanguages.map((language) => (
          <div
            key={language.code}
            onClick={() => handleLanguageSelect(language.name)}
            className={`p-8 flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
              selectedLanguage === language.name ? "bg-blue-600 text-white" : "bg-white text-blue-800"
            }`}
          >
            <span className="text-6xl mb-4">{language.flag}</span>
            <span className="text-2xl font-semibold">{language.name}</span>
          </div>
        ))}
      </div>
      <button onClick={handleContinue} className="bg-blue-600 text-white px-10 py-3 rounded-md text-lg hover:bg-blue-700">
        Continuar
      </button>
    </div>
  );
}

export default SelectLanguage;
