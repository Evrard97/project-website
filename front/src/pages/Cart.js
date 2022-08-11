import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { Store } from "./../Store";
import DisplayMessage from "./../components/DisplayMessage";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartItem = (item, quantity) => {
    if (item.stock < quantity) {
      window.alert("Produit en rupture de stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const deleteItem = (item) => {
    ctxDispatch({ type: "CART_DELETE_ITEM", payload: item });
    console.log(item);
  };

  const payement = () => {
    navigate("/login?redirect=/deliveryAdress");
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <Helmet>
          <title>Panier</title>
        </Helmet>
        <h1 className="font-bold text-[40px] px-8">Panier</h1>
        {cartItems.length === 0 ? (
          <DisplayMessage className="p-4 mb-4 text-xl text-slate-200 bg-red-400 rounded-lg">
            Panier vide.{" "}
            <Link to="/" className="font-bold">
              Vers la boutique!
            </Link>
          </DisplayMessage>
        ) : (
          <div className="flex shadow-md my-6">
            <div className="w-[75%] bg-white px-10 py-10">
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-[16px] uppercase w-[40%]">
                  Produits
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-[16px] uppercase w-[20%]">
                  Quantité
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-[16px] uppercase w-[20%]">
                  Prix
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-[16px] uppercase w-[20%]">
                  Total
                </h3>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center -mx-8 px-6 py-5"
                >
                  <div className="flex w-[40%]">
                    <div className="w-20">
                      <Link to={`/product/${item.reference}`}>
                        <img
                          className="w-24 h-24"
                          src={item.image}
                          alt={item.name}
                        />{" "}
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <Link to={`/product/${item.reference}`}>
                        <span className="font-bold text-sm">{item.name}</span>
                      </Link>
                      <span className="text-red-500 text-xs">{item.mark}</span>
                      <span
                        onClick={() => deleteItem(item)}
                        className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-xs"
                      >
                        Supprimer
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center w-[20%]">
                    {/* - */}
                    <button
                      onClick={() => updateCartItem(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <svg
                        className="fill-current text-gray-600 w-3 "
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    {/* display product quantity */}
                    <span className="mx-2 border text-center w-8">
                      {item.quantity}
                    </span>
                    {/* + */}
                    <button
                      onClick={() => updateCartItem(item, item.quantity + 1)}
                      disabled={item.quantity === item.stock}
                    >
                      <svg
                        className="fill-current text-gray-600 w-3 "
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-center w-[20%] font-semibold text-sm">
                    {item.price} €
                  </span>
                  <span className="text-center w-[20%] font-semibold text-sm">
                    {item.price * item.quantity}€
                  </span>
                </div>
              ))}

              <Link
                to="/"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continuer le Shopping
              </Link>
            </div>
            <div id="summary" className="w-[25%] px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Résumé de la commande
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  {cartItems.reduce((sum, ca) => sum + ca.quantity, 0)}{" "}
                  article(s)
                </span>
                <span className="font-semibold text-sm">
                  {cartItems.reduce(
                    (sum, ca) => sum + ca.price * ca.quantity,
                    0
                  )}{" "}
                  €
                </span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Frait de port
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option value="-">Mode de Livraison</option>
                  <option value="10.00">Livraison standard - 10.00 €</option>
                  <option value="20.00">Livraison express - 20.00 €</option>
                </select>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total</span>
                  <span>
                    {cartItems.reduce(
                      (sum, ca) => sum + ca.price * ca.quantity,
                      0
                    )}{" "}
                    €
                  </span>
                </div>
                <button
                  onClick={payement}
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                >
                  Payement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
