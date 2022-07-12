import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/login_signup.css";
import { Link } from "react-router-dom";

function Login() {
  // const [pseudo, setPseudo] = useState("");
  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      const container = document.getElementById("container");
      container.classList.remove("right-panel-active");
    });

    return () => {
      signInButton.removeEventListener("click", () => {});
      signUpButton.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="signIn-signUp">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form /*onSubmit={handleRegister}*/>
              <h1>Créer un compte</h1>
              <br />
              <input
                type="text"
                placeholder="Pseudonyme"
                // onChange={(e) => setPseudo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Prénom et nom"
                // onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="email"
                placeholder="Adresse mail"
                // onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                // onChange={(e) => setPassword(e.target.value)}
              />
              <button>S'inscrire</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form /*onSubmit={handleLogin}*/>
              <h1>Se connecter</h1>
              <br />
              <input
                type="email"
                placeholder="Adresse mail"
                // onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                // onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="#">Mot de passe oublié ?</Link>
              <button>Se connecter</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>De retour ?</h1>
                <p>Pour rester connecter avec la communauté</p>
                <button className="ghost" id="signIn">
                  Se connecter
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Salut !</h1>
                <p>Bienvenue sur notre blog !</p>
                <button className="ghost" id="signUp">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
