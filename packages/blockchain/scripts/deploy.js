// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const GameContract = await ethers.getContractFactory("GameContract");
    const gameContract = await GameContract.deploy();

    console.log("GameContract deployed to:", gameContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
