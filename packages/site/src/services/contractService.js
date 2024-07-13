// services/contractService.js
import { ethers } from "ethers";
import GameContractABI from "../../../blockchain/artifacts/contracts/GameContract.sol/GameContract.json";

const CONTRACT_ADDRESS = "0xA85679DdCA323C2Abf1A6bed7209A81c29e03661";

export const createGame = async (signer, betAmount) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GameContractABI.abi, signer);
    const tx = await contract.createGame(betAmount);
    await tx.wait();
};

export const joinGame = async (signer) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GameContractABI.abi, signer);
    const tx = await contract.joinGame();
    await tx.wait();
};

export const acceptBet = async (signer) => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, GameContractABI.abi, signer);
    const tx = await contract.acceptBet();
    await tx.wait();
};
