import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const App = React.lazy(() => import(/* webpackChunkName: "App" */ "./App"));

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: () => ({
      http: `https://long-purple-emerald.bsc.quiknode.pro/c6dfc3a1f82298992cfd623b69125f65848788b3/`,
    }),
  }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const Main = () => {
  return (
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <WagmiConfig client={client}>
          <App />
        </WagmiConfig>
      </Suspense>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
