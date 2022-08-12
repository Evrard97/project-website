import { Link } from "react-router-dom";
import { Store } from "./../Store";
import { useContext } from "react";
import logo from "../logo/top-market-logo.gif";

function HeadNav() {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(userInfo);
  return (
    <div className="container flex items-center justify-between">
      <Link to="/" className="text-[25px] uppercase">
        <img src={logo} alt="logo" className="h-[4vw]" />
      </Link>

      <div className="w-full.max-w-xl relative flex">
        <span className="absolute left-4 top-3 text-lg text-black">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          className="w-full border border-indigo-500 border-r-0 pl-12 py-3 pr-3 rounded-1-md focus:outline-none"
          placeholder="Recherche"
        ></input>
        <button className="bg-indigo-500 border border-indigo-500 text-white px-8 rounded-r-md hover:bg-transparent hover:bg-indigo-700 transition">
          Recherche
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/cart"
          className="text-center text-gray-700 hover:text-red-400 transition relative"
        >
          <div className="text-2xl">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="text-xs leading-3">Panier</div>

          {cart.cartItems.length > 0 && (
            <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-400 text-white text-xs">
              {cart.cartItems.reduce(
                (itemQuantity, curItem) => itemQuantity + curItem.quantity,
                0
              )}
            </span>
          )}
        </Link>

        {!userInfo ? (
          <Link
            to="/login"
            className="text-center text-gray-700 hover:text-red-400 transition relative"
          >
            <div className="text-2xl">
              <i className="fas fa-user"></i>
            </div>
            <div className="text-xs leading-3">Profile</div>
          </Link>
        ) : (
          <div className="px-8 py-4 text-2xl text-gray-700 hover:text-red-400 flex items-center cursor-pointer relative group">
            <span className="text-2lg">
              <i className="fas fa-user"></i>
            </span>
            <span className="ml-2 text-black ">{userInfo.data.pseudo}</span>
            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <Link
                to="/orderlist"
                className="flex items-center px-2 py-3 hover:bg-red-400 transition"
              >
                <span className="text-black text-[15px]">Mes commandes</span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center px-2 py-3 hover:bg-red-400 transition"
              >
                <span className="text-black text-[15px]">Mes informations</span>
              </Link>
            </div>
          </div>
        )}
        {userInfo && userInfo.data.isAdmin && (
          <div className="px-8 py-4 text-2xl text-gray-700 hover:text-red-400 flex items-center cursor-pointer relative group">
            <span className="text-2lg">
              <i className="fas fa-user"></i>
            </span>
            <span className="ml-2 text-black ">Admin</span>
            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <Link
                to="/admin/dashboard"
                className="flex items-center px-2 py-3 hover:bg-red-400 transition"
              >
                <span className="text-black text-[15px]">Tableau de bord</span>
              </Link>

              <Link
                to="/admin/productList"
                className="flex items-center px-2 py-3 hover:bg-red-400 transition"
              >
                <span className="text-black text-[15px]">Produits</span>
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center px-2 py-3 hover:bg-red-400 transition"
              >
                <span className="text-black text-[15px]">Utilisateurs</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeadNav;
