import { Helmet } from "react-helmet-async";
import "../styles/paymentSteps.css";
import React, { useState, useEffect, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "./../Store";
import StepsPayment from "../components/StepsPayment";

export default function DeliveryAddress() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { deliveryAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/deliveryAdress");
    }
  }, [userInfo, navigate]);
  //
  const [name, setName] = useState(deliveryAddress.name || "");
  const [firstname, Setfirstname] = useState(deliveryAddress.firstname || "");
  const [email, setEmail] = useState(deliveryAddress.email || "");
  const [selectedCountry, setSelectedCountry] = useState(
    deliveryAddress.selectedCountry || ""
  );
  const [address, setAddress] = useState(deliveryAddress.address || "");
  const [city, setCity] = useState(deliveryAddress.city || "");
  const [region, setRegion] = useState(deliveryAddress.region || "");
  const [postalCode, setPostalCode] = useState(
    deliveryAddress.postalCode || ""
  );

  const submithandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_DELIVERY_ADDRESS",
      payload: {
        name,
        firstname,
        email,
        selectedCountry,
        address,
        city,
        region,
        postalCode,
      },
    });

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify({
        name,
        firstname,
        email,
        selectedCountry,
        address,
        city,
        region,
        postalCode,
      })
    );
    navigate("/payment");
  };
  return (
    <>
      <Fragment>
        <div className="container mx-auto mt-10">
          <Helmet>
            <title>Adresse de livraison</title>
          </Helmet>

          <StepsPayment step1 step2></StepsPayment>

          <h1 className="font-bold text-[40px] pt-4">Adresse de livraison</h1>
          <div className="row top">
            <div className="col-1">
              <form onSubmit={ submithandler }>
                <ul>
                  <li>
                    <div className="card card-body">
                      <h1 className="font-bold text-md border-b pb-2">
                        Identité
                      </h1>
                      <p className="font-semibold text-sm">
                        <label
                          htmlFor="first-name"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full h-[35px] border text-lg border-indigo-500 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
                        <br />
                        <label
                          htmlFor="last-name"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={firstname}
                          onChange={(e) => Setfirstname(e.target.value)}
                          required
                          className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
                        <br />
                        <label
                          htmlFor="email-address"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Adresse mail
                        </label>
                        <input
                          type="emailt"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="card card-body">
                      <h1 className="font-bold text-md border-b pb-2">
                        Adresse postale
                      </h1>
                      <p className="font-semibold text-sm">
                        <label
                          htmlFor="country"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Pays
                        </label>
                        <select
                          defaultValue={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          fireEvent={(e) => setSelectedCountry(e.target.value)}
                          className="w-full h-[35px] border text-lg border-indigo-500 mt-1 block py-2 px-3 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>France</option>
                          <option>United States</option>
                          <option>Italie</option>
                          <option>Mexique</option>
                        </select>
                        <br />
                        <label
                          htmlFor="region"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Région
                        </label>
                        <input
                          type="text"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          required
                          className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
                        <br />
                        <label
                          htmlFor="street-address"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Addresse
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
                        <br />
                        <label
                          htmlFor="city"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Ville
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
                        <br />
                        <label
                          htmlFor="postal-code"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Code postale
                        </label>
                        <input
                          type="number"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                          className="w-full h-[35px] border border-indigo-500 text-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm rounded-md"
                        />
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
      </Fragment>
    </>
  );
}
