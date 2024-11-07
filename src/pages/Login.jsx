import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api.js";
import img from "../assets/TalkLogo.png";
import { useUser } from "../auth/authContext";
import Swal from "sweetalert2";

function Login() {
  const emailRef = useState();
  const passRef = useState();
  const navigate = useNavigate();
  const { setUser } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });

      const user = response.data.userExist;
      console.log("Usuario:", JSON.stringify(user, null, 2));
      setUser(user);

      if (!user.primaryLanguage || user.primaryLanguage.length === 0) {
        Swal.fire({
          title: "Login bem-sucedido!",
          text: "Bem-vindo ao seu painel!",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          navigate("/Idiomas", { state: { user } });
        });
      } else {
        Swal.fire({
          title: "Login bem-sucedido!",
          text: "Bem-vindo de volta!",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          navigate("/Home", { state: { user } });
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Erro",
        text: "Email ou senha incorretos",
        icon: "error",
        confirmButtonText: "Tente novamente",
      });
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-500 via-[#2728c0] to-blue-700 font-nunito">
      <div className="flex flex-col items-center bg-white rounded-xl shadow-2xl p-12 w-full max-w-lg mx-auto transform transition-all duration-500 scale-105 hover:scale-110">
        <img src={img} alt="Logo do App" className="w-44 h-auto mb-10" />
        <h1 className="text-5xl font-extrabold text-blue-700 mb-12">Talk Language</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-gray-700 font-semibold text-lg">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Digite seu e-mail"
              id="email"
              className="px-5 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-gray-700 font-semibold text-lg">Senha</label>
            <input
              ref={passRef}
              type="password"
              placeholder="Digite sua senha"
              id="password"
              className="px-5 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>
          <button className="w-full h-14 bg-[#2728c0] text-white font-bold rounded-lg mt-6 text-xl hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105">
            Entrar
          </button>
        </form>
        <Link to="/Cadastro" className="mt-6 text-blue-600 hover:text-blue-800 hover:underline transition">
          Não possui uma conta? Cadastre-se!
        </Link>
      </div>
    </div>
  );
}

export default Login;
