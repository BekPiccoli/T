import { Link } from "react-router-dom";
import img from "../assets/TalkLogo.png";
import "../styles/MenuLateral.css";

const MenuLateral = () => {
  return (
    <div className="MenuLateral">
      <div className="MenuLateral-Logo">
        <Link to="/Home">
          <img src={img} alt="Logo do App" />
        </Link>
      </div>
      <div className="MenuLateral-Menu">
        <ul>
          <li>
            <Link to="/Perfil">Pefil</Link>
          </li>
          <li>
            <Link to="/Atividades">Atividades</Link>
          </li>
          <li>
            <Link to="/Desempenho">Desempenho</Link>
          </li>
          <li>
            <Link to="/Configuracao">Configurações</Link>
          </li>
          <li>
            <Link to="/Sobre">Sobre</Link>
          </li>
        </ul>
      </div>
      <div className="MenuLateral-Footer">© 2024 Talk Language</div>
    </div>
  );
};

export default MenuLateral;
