import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ChainBattlesModule = buildModule("ChainBattlesModule", (m) => {
  const chainBattles = m.contract("ChainBattles", []);

  return { chainBattles };
});

export default ChainBattlesModule;
