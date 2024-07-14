# Project Name: SkyCG

A Web3-enhanced card game where players strategically place cards on a 5x5 grid to capture territory and score points. The game utilizes the Linea testnet for matchmaking, bidding, and room management, demonstrating the potential of blockchain technology in traditional tabletop gaming.

## Table of Contents

- (#description)
- (#features)
- (#technologies-used)
- (#getting-started)
   - (#prerequisites)
   - (#installation)
   - (#running-the-game)
- (#game-mechanics)
- (#smart-contract-details)
   - (#contract-addresses)
   - (#contract-functions)
- (#future-development)
- (#contributing)
- (#license)

## Description

This project is a proof-of-concept that explores the intersection of Web3 technology and traditional tabletop gaming. A classic card game with a 5x5 grid board and territory capture mechanics, enhancing it with blockchain-based features. The goal is to demonstrate how Web3 can add value to existing game designs.

Core Game Mechanics

Two-player Card Game: Players strategically place cards on the board, aiming to capture territory and score points based on card values and board positions (with multipliers for certain areas).

Web3 Integration: 
Leverages the Linea testnet to facilitate key game interactions:

- Waiting Room/Matchmaking: Smart contracts create and manage waiting rooms, allowing - - players to find opponents and join games.
- Bidding: Smart contracts handle pre-game bids
- Room Management: Players can delete rooms when they disconnect or want to end a game.

Technical Implementation

Frontend (React/JavaScript): The core gameplay logic and UI are implemented using React and JavaScript. This handles card interactions, board updates, and player actions.

Smart Contracts (Linea Testnet):
Written in Solidity
Deployed on the Linea testnet to manage game rooms, matchmaking, bidding, and room deletion.

Hybrid Approach: The game logic is primarily handled on the frontend to minimize on-chain transaction costs and provide a smoother user experience. Smart contracts are used for crucial interactions that benefit from decentralization and transparency.

Future Considerations

Deployment Options: we are exploring different approaches for deploying the game logic:
Backend Server: Offers more flexibility and control but introduces centralized elements (A bit over the top for our needs).
Database: Provides a way to store and synchronize game state, but raises questions about data ownership and access.
Fully On-Chain: Ensures maximum decentralization but could be expensive and complex to implement for all game actions.

Ownership of In-Game Assets: Players could potentially own their cards as NFTs, allowing for true digital ownership and potential secondary markets.

Decentralized Matchmaking: The use of smart contracts can create a transparent and trustless matchmaking system.

## Technologies Used

- **Frontend:** React, TypeScript, JavaScript, HTML, CSS
- **Smart Contracts:** Solidity (deployed on Linea testnet)
- **Blockchain Interaction:** Wagmi, MetaMask SDK, remix

## Getting Started

### Prerequisites

- npm (or yarn) installed
- MetaMask wallet with Linea testnet configured

### Installation

1. Clone the repository: `git clone https://github.com/TendosBG/SkyCG.git`
2. Install dependencies: `npm install` (or `yarn`)

### Running the Game

Change folder : cd packages/site/

1. Start the frontend: `npm run dev` (or `yarn start`)
2. The game should open in your browser.
3. Connect your MetaMask wallet to the Linea testnet.
4. Follow the in-game instructions to create or join a game room.

## Game Mechanics

## Smart Contract Details
Smart contracts are used to sign a game between the two players and to acknowledge the winner of a game.

### Contract Addresses

- Contract address : 0xE855bEa1B0289420ceE99bc9a8524c3744a4710b

### Contract Functions

- createGame(uint256 bid)
- joinGame()
- deleteGame()
- startGame()
- endGame()

## Future Development

Full backend of the game running on Chain. Bet system using the currency ($ETH)

## License

MIT License

Copyright© 2024 Kryptosphere® Belgium
