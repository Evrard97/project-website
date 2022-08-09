import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import StepsPayment from "../components/StepsPayment";
import { Store } from "./../Store";

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { deliveryAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );
  useEffect(() => {
    if (!deliveryAddress.address) {
      navigate("/deliveryAdress");
    }
  }, [deliveryAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ tye: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeholder");
  };
  return (
    <div>
      <Helmet>
        <title>Methode de paiement</title>
      </Helmet>
      <StepsPayment step1 step2 step3></StepsPayment>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Method de paiement</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
}
