import { useState } from "react";
import { useUser } from "../auth/authContext";
import { api } from "../services/api";
function Perfil() {
  const [image, setImage] = useState();
  const { user } = useUser();
  async function photoSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await api.post("/upload-image", formData, headers);
    } catch (err) {
      console.error(err);
    }
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      photoSubmit(file);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center w-full h-full bg-sky-200">
        <div className="w-11/12 h-72 ml-2 mr-2 mb-2  border-gray-300 bg-[url('./src/assets/planodefundo.jpg')] shadow-xl rounded-b-2xl flex flex-col justify-center items-center">
          <form onSubmit={photoSubmit}>
            <label
              title="Alterar foto de perfil"
              className="cursor-pointer w-48 h-44 bg-white border-2 border-black rounded-xl flex justify-center items-center hover:bg-gray-200"
            >
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
              <img
                className=" w-full h-full rounded-lg"
                src={image ? URL.createObjectURL(image) : ""}
                alt="Foto de perfil"
              />
            </label>
          </form>
          <h1 className="text-white">{user ? user.name : "Usuário"}</h1>
        </div>
        <div className="mt-3 w-11/12 h-3/4   border-gray-300 bg-white shadow-xl rounded-t-2xl flex items-center justify-center ">
          <div className=" w-4/5 h-4/5  flex-col flex items-center justify-center">
            <a className="text-2xl mr-10 "> Meu perfil</a>
            <label className="flex flex-col items-center justify-center w-3/6 h-72">
              <div className="flex flex-row items-center w-10/12">
                <div className="flex flex-col mb-3 w-9/12">
                  Nome:
                  <input
                    type="text"
                    placeholder="Digite sua senha"
                    id="password"
                    className="px-5 py-3 border border-gray-300 rounded-lg w-11/12 shadow-sm focus:outline-none focus:border-blue-600 text-lg"
                    value={user ? user.email : "User name"}
                  />
                </div>
                <button className=" mt-2 w-24 h-12 rounded-lg bg-gradient-to-b from-[#2728c0] to-[#003366] hover:bg-[#ffffff1a]">
                  <a className="text-white">Alterar</a>
                </button>
              </div>
              <div className="flex flex-row items-center w-10/12">
                <div className="flex flex-col mb-3 w-9/12">
                  Email:
                  <input
                    type="text"
                    placeholder="Digite sua senha"
                    id="password"
                    className="px-5 py-3 border border-gray-300 rounded-lg w-11/12 shadow-sm focus:outline-none focus:border-blue-600 text-lg"
                    value={user ? user.email : "User email"}
                  />
                </div>
                <button className=" mt-2 w-24 h-12 rounded-lg bg-gradient-to-b from-[#2728c0] to-[#003366]">
                  <a className="text-white">Alterar</a>
                </button>
              </div>
              <div className="flex flex-row  items-center w-10/12">
                <div className="flex flex-col w-9/12">
                  Senha:
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    id="password"
                    className="px-5 py-3  border border-gray-300 rounded-lg  w-11/12 shadow-sm focus:outline-none focus:border-blue-600 text-lg"
                    value={user ? user.password : "User pass"}
                  />
                </div>
                <button className="mt-5 w-24 h-12 rounded-lg bg-gradient-to-b from-[#2728c0] to-[#003366]">
                  <a className="text-white">Alterar</a>
                </button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
export default Perfil;
