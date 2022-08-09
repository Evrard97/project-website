import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { Store } from "./../Store";
import { useNavigate } from "react-router-dom";
import StepsPayment from "../components/StepsPayment";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const payement = () => {
    navigate("/login?redirect=/deliveryAdress");
  };
  const edit = () => {
    navigate("/cart");
  };
  return (
    <div className="container mx-auto mt-10">
      <Helmet>
        <title>Paiement</title>
      </Helmet>
      <StepsPayment step1 step2 step3 step4></StepsPayment>
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl text-center">
          Résumé de la commande
        </h1>
      </div>
      <div className="flex shadow-md my-10">
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
            <div key={item._id} className="flex items-center -mx-8 px-6 py-5">
              <div className="flex w-[40%]">
                <div className="w-20">
                  <img className="w-24 h-24" src={item.image} alt={item.name} />{" "}
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-red-500 text-xs">{item.mark}</span>
                  <span
                    onClick={() => edit()}
                    className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-xs"
                  >
                    Modifier
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-[20%]">
                <span className="mx-2 border text-center w-8">
                  {item.quantity}
                </span>
              </div>
              <span className="text-center w-[20%] font-semibold text-sm">
                {item.price} €
              </span>
              <span className="text-center w-[20%] font-semibold text-sm">
                {item.price * item.quantity}€
              </span>
            </div>
          ))}
        </div>
        <div id="summary" className="w-[25%] px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Passer la commande
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              {cartItems.reduce((sum, ca) => sum + ca.quantity, 0)} article(s)
            </span>
            <span className="font-semibold text-sm">
              {cartItems.reduce((sum, ca) => sum + ca.price * ca.quantity, 0)} €
            </span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total</span>
              <span>
                {cartItems.reduce((sum, ca) => sum + ca.price * ca.quantity, 0)}{" "}
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
    </div>
  );
}
