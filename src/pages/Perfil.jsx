import MenuLateral from "../components/MenuLateral";
import img from "../assets/user.png";

function Perfil() {
  return (
    <>
      <div className="flex flex-row ">
        <MenuLateral />
        <div className="flex flex-col  bg-[#ececec]  w-screen h-screen">
          <div className="w-full h-2/6 ml-2 mr-2 mb-2  border-gray-300 bg-[#e4faff] shadow-xl rounded-b-2xl flex flex-col justify-center items-center">
            Perfil
            <div className="w-24 h-24 bg-white  border-2 border-black rounded-full flex justify-center items-center">
              <a>
                <img src={img}></img>
              </a>
            </div>
          </div>
          <div className="w-full h-3/4 m-2  border-gray-300 bg-[#e4faff] shadow-xl rounded-2xl flex"></div>
        </div>
      </div>
    </>
  );
}
export default Perfil;
