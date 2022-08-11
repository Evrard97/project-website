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

      <div className="row top">
        <div className="col-2">
          <ul>
            {/* delivery address */}
            <li>
              <div className="card card-body">
                <h1 className="font-bold text-md border-b pb-2">
                  Adresse de livraison
                </h1>
                <p className="font-semibold text-sm uppercase">
                  <strong>Nom : </strong>
                  { cart.deliveryAddress.name } { "" } { cart.deliveryAddress.firstname }
                  <br />
                  <strong>Adresse : </strong>
                  { cart.deliveryAddress.address }, { cart.deliveryAddress.postalCode }, { cart.deliveryAddress.city }, { cart.deliveryAddress.selectedCountry }
                </p>
                <span
                  onClick={() => editAddress()}
                  className="font-semibold hover:tex-red-500 hover:cursor-pointer text-gray-500 text-md"
                >
                  Modifier
                </span>
              </div>
            </li>
            {/* Payment method */}
            <li>
              <div className="card card-body">
                <h1 className="font-bold text-md border-b pb-2">
                  Paiement
                </h1>
                <p className="font-semibold text-sm uppercase">
                  <strong>Méthode de paiement : </strong>
                  { cart.paymentMethod }
                </p>
                <span
                  onClick={() => editPaymentMethod()}
                  className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-md"
                >
                  Modifier
                </span>
              </div>
            </li>
            {/* Articles */}
            <li>
              <div className="card card-body">
                <h1 className="font-bold text-md border-b pb-2">
                  Articles
                </h1>
                <ul>
                  { cart.cartItems.map((item) => (
                    <li key={ item._id }>
                      <div className="row">
                        <div>
                          <img className="small" src={ item.image } alt={ item.name } />
                        </div>
                        <div className="min-30">
                          { item.name }
                          <br />
                          <span
                            onClick={() => edit() }
                            className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-xs"
                          >
                            Modifier
                          </span>
                        </div>
                        <div>
                          { item.quantity } x { item.price } € = { item.quantity * item.price } €
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <h1 className="font-bold text-md border-b pb-2">Montant de la commande</h1>
            <ul className="font-semibold text-sm uppercase">
              <li>
                <div className="row">
                  <div>{ cart.totalItems } article(s)</div>
                  <div>{ cart.itemsPrice } €</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Taxe</div>
                  <div>{ cart.taxPrice } €</div>
                </div>
              </li>
            </ul>
            <ul className="border-t mt-8 uppercase font-bold">
              <li>
                <div className="row">
                  <div>Total</div>
                  <div>{ cart.totalPrice } €</div>
                </div>
              </li>
              <li>
                <button
                  onClick={ payment }
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                >
                  Paiement
                </button>
              </li>
            </ul>
          </div>
          {loading && <Loading></Loading>}
        </div>
      </div>
    </div>
  );
}
