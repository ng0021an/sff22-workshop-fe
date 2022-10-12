import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";

const APP_NAME = "Workshop Playground";
const DEFAULT_RPC_URL = ""; // This is only needed as a fallback, reference https://docs.cloud.coinbase.com/wallet-sdk/docs/initializing
const DEFAULT_CHAIN_ID = 137; // Connect to polygon

// Hook for connecting to Coinbase Wallet
export function useWallet() {
  // Currently connected account
  // This will have 3 main states:
  // - undefined: App has not checked if the wallet has been connected or not
  // - null: App has confirmed that the wallet has not been connected
  // - string: Address of the connected wallet
  const [account, setAccount] = useState(undefined);

  // Memo-ed Etherum provider
  const ethersProvider = useMemo(() => {
    // Initialize Coinbase Wallet SDK
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
    });

    // Initialize the Web3 Provider object
    // This is equivalent to the injected provider from Coinbase Wallet
    const coinbaseWalletProvider = coinbaseWallet.makeWeb3Provider(
      DEFAULT_RPC_URL,
      DEFAULT_CHAIN_ID,
    );

    // Wrap the Web3 Provider with ether.js provider for better APIs
    const provider = new ethers.providers.Web3Provider(
      coinbaseWalletProvider,
      DEFAULT_CHAIN_ID,
    );

    return provider;
  }, []);

  // Check if a wallet account has been previously connected before
  useEffect(() => {
    (async () => {
      const accounts = await ethersProvider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    })();
  }, [ethersProvider, setAccount]);

  // Function to attempt a connection with Coinbase Wallet
  const connectWallet = useCallback(async () => {
    // No need to connect if a wallet has already been connected
    if (account != null) {
      return account;
    }

    try {
      const accounts = await ethersProvider.send("eth_requestAccounts", []);

      // Update `account` state if a wallet account has been connected successfully
      const connectedAccount = accounts[0];
      if (connectedAccount != null) {
        setAccount(connectedAccount);
      }
      return connectedAccount;
    } catch (error) {
      console.error("Failed to connect to Coinbase Wallet", error);
    }
  }, [ethersProvider, setAccount]);

  return {
    account,
    ethersProvider,
    connectWallet,
  };
}
