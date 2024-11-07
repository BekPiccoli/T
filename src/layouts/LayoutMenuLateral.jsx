import React from "react";
import MenuLateral from "../components/MenuLateral";
import "../styles/LayoutMenuLateral.css";

const MainLayout = ({ children }) => {
  return (
    <div className="MainLayout">
      <MenuLateral />
      <div className="Content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
