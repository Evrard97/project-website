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
    navigate("/placeorder");
  };
  return (
    <div className="container mx-auto mt-10">
      <Helmet>
        <title>Mode de paiement</title>
      </Helmet>

      <StepsPayment step1 step2 step3></StepsPayment>

      <h1 className="font-bold text-[40px] pt-4">Mode de paiement</h1>
      <div className="row top">
        <div className="col-1">
          <form onSubmit={ submitHandler }>
            <ul>
              <li>
                <div className="card card-body">
                  <h1 className="font-bold text-md border-b pb-2">
                    Choisissez votre mode de paiement
                  </h1>
                  <p>
                    <input
                      type="radio"
                      id="paypal"
                      value="PayPal"
                      checked={ paymentMethodName !== "Stripe" }
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label
                      htmlFor="paypal"
                      className="ml-5 text-xl font-medium text-gray-700"
                    >
                      Paypal
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="stripe"
                      value="Stripe"
                      checked={ paymentMethodName === "Stripe" }
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label
                      htmlFor="stripe"
                      className="ml-5 text-xl font-medium text-gray-700"
                    >
                      Stripe
                    </label>
                  </p>
                </div>
              </li>
            </ul>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Suivant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
