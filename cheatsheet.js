import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";

import "./styles.css";

// Initialize walletSDK and get a wallet provider
const polygonChainId = 137;
const coinbaseWalletSDK = new CoinbaseWalletSDK({ appName: "Hello" });
const rawProvider = coinbaseWalletSDK.makeWeb3Provider("", polygonChainId);
const provider = new ethers.providers.Web3Provider(rawProvider, polygonChainId);

// Onclick handler to connect wallet
async function connectWallet() {
  const accounts = await provider.send("eth_requestAccounts", []);
  alert("Success! Address: " + accounts);
}

export default function App() {
  return (
    <div className="App">
      <h1>RockSolidFinance</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}
