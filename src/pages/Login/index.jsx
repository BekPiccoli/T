import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api.js";
import img from "../../assets/TalkLogo.png";
function Login() {
  const emailRef = useState();
  const passRef = useState();
  const navegate = useNavigate();
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(emailRef.current.value);
      console.log(passRef.current.value);
      await api.post("/Login", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      navegate("/Home");
    } catch (err) {
      alert("Email ou senha incorretos");
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen ">
        <div className="">
          <img src={img} alt="img" />
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-gray-300 bg-white rounded-lg shadow-xl w-3/6 h-4/6">
          <h1>
            <strong className=" h-3.5 text-blue-900 text-3xl mb-11">
              Talk Language
            </strong>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col gap-2 w-1/2  mb-11"
          >
            <div className="w-full">
              Email:
              <input
                ref={emailRef}
                type="email"
                placeholder="E-mail"
                name=""
                id="email"
                className="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline"
              />
            </div>
            <div className="w-full">
              Senha:
              <input
                ref={passRef}
                type="password"
                placeholder="Senha"
                name=""
                id="password"
                className="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline"
              />
            </div>
            <button className="w-full h-10 bg-[#1da1f2] text-white rounded-md	m-1 hover:bg-sky-600">
              Entrar
            </button>
          </form>

          <Link to="/Cadastro" className="text-sky-700 hover:text-blue-900">
            Não possui uma conta? Cadastre-se!
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;
