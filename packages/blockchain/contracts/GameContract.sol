// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This contract was successfully deployed on Linea Sepolia.

contract GameContract {
    address public player1;
    address public player2;
    uint256 public betAmount;
    bool public gameStarted;

    event GameCreated(address indexed player1, uint256 betAmount);
    event PlayerJoined(address indexed player2);
    event GameStarted(address indexed player1, address indexed player2, uint256 betAmount);
    event GameEnded(address indexed winner, uint256 rewardAmount);
    event GameDeleted(address indexed player1, address indexed player2);
    event RefundIssued(address indexed player, uint256 amount);

    modifier onlyPlayer1() {
        require(msg.sender == player1, "Only player 1 can call this function");
        _;
    }

    modifier onlyPlayer2() {
        require(msg.sender == player2, "Only player 2 can call this function");
        _;
    }

    modifier onlyPlayers() {
        require(msg.sender == player1 || msg.sender == player2, "Only players can call this function");
        _;
    }

    function createGame(uint256 _betAmount) external {
        require(player1 == address(0), "Game already created");
        player1 = msg.sender;
        betAmount = _betAmount;
        emit GameCreated(player1, betAmount);
    }

    function joinGame() external {
        require(player1 != address(0), "Game not created yet");
        require(player2 == address(0), "Game already has two players");
        require(msg.sender != player1, "Player 1 cannot join as player 2");
        player2 = msg.sender;
        emit PlayerJoined(player2);
        this.startGame();
    }


    function startGame() external {
        require(player2 != address(0), "Game does not have a second player");
        require(!gameStarted, "Game already started");
        gameStarted = true;
        emit GameStarted(player1, player2, betAmount);
    }

    function endGame(address _winner) external onlyPlayers {
        require(gameStarted, "Game has not started yet");
        require(_winner == player1 || _winner == player2, "Invalid winner address");

        uint256 rewardAmount = address(this).balance;
        address payable winner = payable(_winner);
        winner.transfer(rewardAmount);

        emit GameEnded(_winner, rewardAmount);

        // Reset the game state
        player1 = address(0);
        player2 = address(0);
        betAmount = 0;
        gameStarted = false;
    }

    function deleteGame() external {
        require(msg.sender == player1 || msg.sender == player2, "Only players can delete the game");
        require(!gameStarted, "Cannot delete a game that has already started");

        emit GameDeleted(player1, player2);

        // Reset the game state
        player1 = address(0);
        player2 = address(0);
        betAmount = 0;
        gameStarted = false;
    }
}
