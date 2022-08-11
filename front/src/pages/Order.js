import React, { useReducer, useContext, useEffect } from "react";
import { Store } from "../Store";
import DisplayMessage from "./../components/DisplayMessage";
import Loading from "./../components/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getErrorFromBackend } from "../utils";
import "../styles/order.css";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, order: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    default:
      return state;
  }
};

export default function Order() {
  const params = useParams();
  const { id: orderId } = params;

  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Verify${userInfo.data.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Commande payée");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getErrorFromBackend(err) });
        toast.error(getErrorFromBackend(err));
      }
    });
  }

  function onError(err) {
    toast.error(getErrorFromBackend(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Verify${userInfo.data.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getErrorFromBackend(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Verify${userInfo.data.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <DisplayMessage></DisplayMessage>
  ) : (
    <div>
      <Helmet>
        <title>Commande</title>
      </Helmet>
      <h1>Commande {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Adresse de livraison</h2>
                <p>
                  <strong> Nom : </strong>
                  {order.deliveryAddress.name} {""}{" "}
                  {order.deliveryAddress.firstname}
                  <br />
                  <strong> Adresse: </strong>
                  {order.deliveryAddress.address},{" "}
                  {order.deliveryAddress.postalCode},
                  {order.deliveryAddress.city},{" "}
                  {order.deliveryAddress.selectedCountry}
                </p>
                {order.isDelivered ? (
                  <DisplayMessage variant="success">
                    Livrée le {order.deliveredAt}
                  </DisplayMessage>
                ) : (
                  <DisplayMessage variant="danger">
                    En cours de livraison
                  </DisplayMessage>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Paiement</h2>
                <p>
                  <strong>Methode:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <DisplayMessage variant="success">
                    Payée le {order.paidAt}
                  </DisplayMessage>
                ) : (
                  <DisplayMessage variant="danger">Non payée</DisplayMessage>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Articles</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.quantity} x {item.price} € =
                          {item.quantity * item.price} €
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
            <ul>
              <li>
                <h2>Detail de la commande</h2>
              </li>
              <li>
                <div className="row">
                  <div>{order.totalItems} Produit(s)</div>
                  <div>{order.itemsPrice} €</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Taxe</div>
                  <div>{order.taxPrice} €</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total Commande</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice} €</strong>
                  </div>
                </div>
              </li>

              {!order.isPaid && (
                <li>
                  {isPending ? (
                    <Loading></Loading>
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  )}
                  {loadingPay && <Loading></Loading>}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
