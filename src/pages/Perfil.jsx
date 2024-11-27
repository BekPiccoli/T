import { useState, useEffect } from "react";
import Swal from "sweetalert2"; 
import { useUser } from "../auth/authContext";
import { api } from "../services/api";
import "../styles/Perfil.css";

function Perfil() {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);
      const headers = { headers: { "Content-Type": "multipart/form-data" } };

      await api.post("/upload-image", formData, headers);

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Foto de perfil atualizada com sucesso!",
        confirmButtonColor: "#2728c0",
      });
    } catch (err) {
      console.error("Erro ao atualizar a foto:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao atualizar a foto de perfil.",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.patch(`/updateuser/${user.id}`, formData);

      setUser({ ...user, ...response.data });

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Informações atualizadas com sucesso!",
        confirmButtonColor: "#2728c0",
      });
    } catch (err) {
      console.error("Erro ao atualizar informações:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao atualizar informações.",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <form onSubmit={handlePhotoSubmit} className="perfil-avatar-form">
          <label className="perfil-avatar">
            <input
              id="photo"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.avatarUrl || "https://via.placeholder.com/150"
              }
              alt="Foto de perfil"
              className="avatar-img"
            />
          </label>
          <button type="submit" className="upload-button">
            Salvar Foto
          </button>
        </form>
        <h1 className="perfil-name">{user?.name || "Usuário"}</h1>
        <p className="perfil-email">{user?.email || "Email do Usuário"}</p>
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
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
            />
          </div>
        </div>
        <button className="update-button" onClick={handleUpdate}>
          Atualizar
        </button>
      </div>
    </div>
  );
}

export default Perfil;
