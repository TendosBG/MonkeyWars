import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import { ConnectWalletButton } from './components/ConnectButton';
import { RoomProvider } from './context/RoomContext';
import { WalletProvider } from './context/WalletContext';

const App = () => {
  return (
    <RoomProvider>
      <WalletProvider>
        <BrowserRouter>
          <main className="relative flex flex-col items-center gap-20 min-h-screen mx-auto md:p-24">
            <div className="flex pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex">
              <div className="absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
                <Link to="/"><h1 className="text-4xl font-bold --bs-danger-text-emphasis">SkyCG</h1></Link>
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
    </RoomProvider>
  );
};

export default App;
