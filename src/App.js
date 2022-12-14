import { useState } from "react";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import wordmark from "./logo-fidelizame.svg";
import "./App.css";

function App() {
  const [account, setAccount] = useState();

  const onClickLogin = async () => {
    const torus = new Torus({});
    await torus.init({
      enableLogging: false,
      // Example white-labeling configuration
      whiteLabel: {
        theme: {
          isDark: false,
          colors: {
            torusBrand1: "#282c34",
          },
        },
        logoDark: "https://tkey.surge.sh/images/Device.svg", // Dark logo for light background
        logoLight: "https://tkey.surge.sh/images/Device.svg", // Light logo for dark background
        topupHide: false,
        featuredBillboardHide: true,
        disclaimerHide: true,
        defaultLanguage: "en",
      },
    });
    await torus.login();

    const web3 = new Web3(torus.provider);
    const address = (await web3.eth.getAccounts())[0];
    const balance = await web3.eth.getBalance(address);
    setAccount({ address, balance });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={wordmark} className="App-logo" alt="logo" />
        {account ? (
          <div className="App-info">
            <p>
              <strong>Address</strong>: {account.address}
            </p>
            <p>
              <strong>Balance</strong>: {account.balance}
            </p>
          </div>
        ) : (
          <>
            <p>Inicia sesión para ingresar a la app.</p>
            <button className="App-link" onClick={onClickLogin}>
              Login
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
