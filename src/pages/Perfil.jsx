import { useState } from "react";
import { useUser } from "../auth/authContext";
import { api } from "../services/api";
import "../styles/Perfil.css";

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
      photoSubmit();
    }
  }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <label className="perfil-avatar">
          <input
            id="photo"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          <img
            src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/150"}
            alt="Foto de perfil"
            className="avatar-img"
          />
        </label>
        <h1 className="perfil-name">{user ? user.name : "Usuário"}</h1>
        <p className="perfil-email">{user ? user.email : "Email do Usuário"}</p>
      </div>
      <div className="perfil-content">
        <h2 className="perfil-section-title">Editar Perfil</h2>
        <div className="perfil-form">
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Digite seu nome"
              defaultValue={user ? user.name : ""}
            />
            <button className="form-button">Alterar</button>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Digite seu email"
              defaultValue={user ? user.email : ""}
            />
            <button className="form-button">Alterar</button>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Digite sua senha"
            />
            <button className="form-button">Alterar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;