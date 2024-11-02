import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { api } from "../../services/api.js";
import img from "../../assets/TalkLogo.png";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const repassRef = useRef();
  const navegate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(
        nameRef.current.value,
        " ",
        emailRef.current.value,
        " ",
        passRef.current.value,
        " ",
        repassRef.current.value,
        " "
      );
      if (passRef.current.value === repassRef.current.value) {
        await api.post("/Cadastro", {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passRef.current.value,
        });
        alert("Cadastro realizado com sucesso");
        navegate("/");
      } else {
        alert("As senhas devem ser idênticas!");
      }
    } catch (err) {
      console.error(err);
      alert("Falaha ao realizar cadastro");
    }
  }
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen ">
        <div>
          <img src={img} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-gray-300 bg-white rounded-lg shadow-xl w-3/6 h-4/6 ">
          <h1>
            <strong className=" h-3.5 text-blue-900 text-3xl mb-11">
              Talk Language
            </strong>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col gap-2 w-1/2  mb-5"
          >
            <div className="w-full">
              Nome:
              <input
                ref={nameRef}
                type="text"
                placeholder="Nome"
                name=""
                id="name"
                className="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline"
              />
            </div>
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
            <div className="w-full ">
              Senha:
              <input
                ref={passRef}
                type="password"
                placeholder="Senha"
                name=""
                id="password"
                className="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline mb-2"
              />
              <input
                ref={repassRef}
                type="password"
                placeholder="Confirme sua senha"
                name=""
                id="repassword"
                className="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline"
              />
            </div>
            <button className="w-full h-10 bg-[#1da1f2] text-white rounded-md	m-1 hover:bg-sky-600">
              Cadastrar-se
            </button>
          </form>
          <Link to="/" className="text-sky-700 hover:text-blue-900">
            Já possui uma conta? Efetue o login!
          </Link>
        </div>
      </div>
    </>
  );
}
export default Cadastro;
