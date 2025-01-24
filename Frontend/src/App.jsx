import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"
import "./App.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const auth = getAuth();
const provider = new GoogleAuthProvider();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [id_token, setId_token] = useState("");

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Logged In: " + result.user.displayName);
        setIsAuth(true);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const apiTest = async () => {
    auth.currentUser.getIdToken().then((token) => {
      setId_token(token);
    });
    axios
      .get("http://localhost:4000/api/test", {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
      });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Firebase Auth</h1>
      <h1>Login</h1>
      <button onClick={loginWithGoogle}>Login</button>
      {isAuth && <button onClick={apiTest}>API test</button>}
    </>
  )
}

export default App
