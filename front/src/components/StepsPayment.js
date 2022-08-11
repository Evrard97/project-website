import React from "react";

export default function StepsPayment(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Se connecter</div>
      <div className={props.step2 ? "active" : ""}>Adresse de livraison</div>
      <div className={props.step3 ? "active" : ""}>Mode de paiement</div>
      <div className={props.step4 ? "active" : ""}>Paiement</div>
    </div>
  );
}
