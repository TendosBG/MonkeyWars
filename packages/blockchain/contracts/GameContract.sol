// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameContract {
    address public player1;
    address public player2;
    uint256 public betAmount;
    bool public gameStarted;

    event GameCreated(address indexed player1, uint256 betAmount);
    event PlayerJoined(address indexed player2);
    event GameStarted(address indexed player1, address indexed player2, uint256 betAmount);

    modifier onlyPlayer1() {
        require(msg.sender == player1, "Only player 1 can call this function");
        _;
    }

    modifier onlyPlayer2() {
        require(msg.sender == player2, "Only player 2 can call this function");
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
    }

    function acceptBet() external onlyPlayer2 {
        require(player2 != address(0), "Game does not have a second player");
        require(!gameStarted, "Game already started");
        gameStarted = true;
        emit GameStarted(player1, player2, betAmount);
    }
}
