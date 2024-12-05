import { ethers } from "hardhat";

async function main() {
    try {
        const CHAINBATTLES = await ethers.getContractFactory("ChainBattles");
        const chainBattles = await CHAINBATTLES.deploy();
        await chainBattles.deployed();

        console.log("ChainBattles deployed to:", chainBattles.address);
        process.exit(0)
    } catch (error) {
        console.error("Error during deployment:", error);
        process.exit(1)
    }
}

main();
