import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "./../Store";
import { useNavigate } from "react-router-dom";
import StepsPayment from "../components/StepsPayment";
import axios from "axios";
import Loading from "./../components/Loading";
import { toast } from "react-toastify";
import { getErrorFromBackend } from "./../utils";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrder() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  // calcule
  /*
   *runded convert values like 45.4578 to 45.45
   */
  const rounded = (number) => Math.round(number * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = rounded(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.totalItems = cart.cartItems.reduce((sum, ca) => sum + ca.quantity, 0);
  cart.taxPrice = rounded(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;

  /*
   *send place order to the backend
   */
  const payment = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          deliveryAddress: cart.deliveryAddress,
          paymentMethod: cart.paymentMethod,
          totalItems: cart.totalItems,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Verify${userInfo.data.token}`,
          },
        }
      );
      ctxDispatch({ type: "CLEAR_CART" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getErrorFromBackend(err));
    }
  };

  const edit = () => {
    navigate("/cart");
  };

  const editAddress = () => {
    navigate("/deliveryAdress");
  };

  const editPaymentMethod = () => {
    navigate("/payment");
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
  return (
    <div className="container mx-auto mt-10">
      <Helmet>
        <title>Paiement</title>
      </Helmet>

      <StepsPayment step1 step2 step3 step4></StepsPayment>

      <h1 className="font-bold text-[40px] pt-4">Passer la commande</h1>
      {/* delivery address */}

      <div id="summary" className="w-[25%] px-4 py-8 ">
        <h1 className="font-bold text-md border-b pb-2">
          Adresse de livraison
        </h1>
        <div className="flex justify-between mt-4 mb-5">
          <span className="font-semibold text-sm uppercase">
            <strong> Nom : </strong>
            {cart.deliveryAddress.name} {""} {cart.deliveryAddress.firstname}
            <br />
            <strong> Adresse: </strong>
            {cart.deliveryAddress.address}, {cart.deliveryAddress.postalCode},
            {cart.deliveryAddress.city}, {cart.deliveryAddress.selectedCountry}
          </span>
          <span
            onClick={() => editAddress()}
            className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-md"
          >
            Modifier
          </span>
        </div>
      </div>
      {/* Payment method */}

      <div id="summary" className="w-[25%] px-4 py-8">
        <h1 className="font-bold text-md border-b pb-2">Methode de paiement</h1>
        <div className="flex justify-between mt-4 mb-5">
          <span className="font-semibold text-sm uppercase">
            <strong> Methode de paiement: </strong>
            {cart.paymentMethod}
          </span>
          <span> {""}</span>
          <span
            onClick={() => editPaymentMethod()}
            className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-md"
          >
            Modifier
          </span>
        </div>
      </div>

      {/*  */}
      <div className="flex shadow-md my-10">
        <div className="w-[75%] bg-white px-10 py-10">
          <div className="flex mt-4 mb-5">
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

          {cart.cartItems.map((item) => (
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
            Montant de la commande
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              {cart.totalItems} article(s)
            </span>
            <span className="font-semibold text-sm">{cart.itemsPrice} €</span>
          </div>

          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Taxe</span>
            <span>{cart.taxPrice} €</span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span className="font-bold">Total</span>
              <span>{cart.totalPrice} €</span>
            </div>
            <button
              onClick={payment}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Paiement
            </button>
          </div>
          {loading && <Loading></Loading>}
        </div>
      </div>
    </div>
  );
}
