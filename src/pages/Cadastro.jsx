import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api.js";
import img from "../assets/TalkLogo.png";
import Swal from "sweetalert2";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const repassRef = useRef();
  const ageRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (passRef.current.value === repassRef.current.value) {
      try {
        await api.post("/register", {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passRef.current.value,
          age: parseInt(ageRef.current.value, 10),
        });
        Swal.fire({
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/");
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Erro",
          text: "Falha ao realizar cadastro",
          icon: "error",
          confirmButtonText: "Tente novamente",
        });
      }
    } else {
      Swal.fire({
        title: "Erro",
        text: "As senhas devem ser idênticas!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-[#2728c0] to-blue-700 font-nunito">
      <div className="flex flex-col items-center bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl mx-auto transform transition-all duration-500 scale-105 hover:scale-110">
        <img src={img} alt="Logo do App" className="w-32 h-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Talk Language</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
          <div className="flex flex-col w-full sm:w-[48%]">
            <label htmlFor="name" className="text-gray-700 font-semibold text-lg">Nome</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Digite seu nome"
              id="name"
              className="px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <label htmlFor="age" className="text-gray-700 font-semibold text-lg">Idade</label>
            <input
              ref={ageRef}
              type="number"
              placeholder="Digite sua idade"
              id="age"
              className="px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <label htmlFor="email" className="text-gray-700 font-semibold text-lg">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Digite seu e-mail"
              id="email"
              className="px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <label htmlFor="password" className="text-gray-700 font-semibold text-lg">Senha</label>
            <input
              ref={passRef}
              type="password"
              placeholder="Digite sua senha"
              id="password"
              className="px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <div className="flex flex-col w-full sm:w-[48%]">
            <label htmlFor="repassword" className="text-gray-700 font-semibold text-lg">Confirme sua Senha</label>
            <input
              ref={repassRef}
              type="password"
              placeholder="Confirme sua senha"
              id="repassword"
              className="px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <button className="w-full h-14 bg-[#2728c0] text-white font-bold rounded-lg mt-4 text-xl hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105">
            Cadastrar-se
          </button>
        </form>
        <Link to="/" className="mt-6 text-blue-600 hover:text-blue-800 hover:underline transition">
          Já possui uma conta? Efetue o login!
        </Link>
      </div>
    </div>
  );
}

export default Cadastro;
