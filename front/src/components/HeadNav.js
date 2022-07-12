import { Link } from "react-router-dom";
import { Store } from "./../Store";
import { useContext } from "react";
import logo from "../logo/E-COMMERCE.gif";
function HeadNav() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div className="container flex items-center justify-between">
      <Link to="/" className="text-[25px] uppercase">
        <img src={logo} alt="logo" className="w-[13vw] h-[10vw]" />
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
        <button className="bg-indigo-500 border border-indigo-500 text-white px-8 rounded-r-md hover:bg-transparent hover:text-red-400 transition">
          Recherche
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="#"
          className="text-center text-gray-700 hover:text-red-400 transition relative"
        >
          <div className="text-2xl">
            <i className="fas fa-heart"></i>
          </div>
          <div className="text-xs leading-3">Favorie</div>
          <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-400 text-white text-xs">
            7
          </span>
        </Link>

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

        <Link
          to="#"
          className="text-center text-gray-700 hover:text-red-400 transition relative"
        >
          <div className="text-2xl">
            <i className="fas fa-user"></i>
          </div>
          <div className="text-xs leading-3">Pofile</div>
        </Link>
      </div>
    </div>
  );
}

export default HeadNav;
