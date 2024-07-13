import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from "./components/WalletContext";
import { ConnectWalletButton } from "./components/ConnectButton";
import Home from './components/Home';
import Game from './components/Game';

const App = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <main className="relative flex flex-col items-center gap-20 min-h-screen mx-auto md:p-24">
          <div className="flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex">
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
              <h1 className="text-4xl font-bold">MONKEY WARS</h1>
            </div>
            <ConnectWalletButton />
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:address" element={<Game />} />
          </Routes>
        </main>
      </BrowserRouter>
    </WalletProvider>
  );
};

export default App;
