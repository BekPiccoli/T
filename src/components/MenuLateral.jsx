import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/TalkLogo.png";
import "../styles/MenuLateral.css";

const MenuLateral = () => {
    return (
        <div className="MenuLateral">
            <div className="MenuLateral-Logo">
                <img src={img} alt="Logo do App" />
            </div>
            <div className="MenuLateral-Menu">
                <ul>
                    <li><Link to="/Atividade">Atividades</Link></li>
                    <li><Link to="/Login">Desempenho</Link></li>
                    <li><Link to="/Configuracao">Configurações</Link></li>
                    <li><Link to="/Sobre">Sobre</Link></li>
                </ul>
            </div>
            <div className="MenuLateral-Footer">
                © 2024 Talk Language
            </div>
        </div>
    );
};

export default MenuLateral;
