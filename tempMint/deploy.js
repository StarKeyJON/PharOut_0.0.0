/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */

const { ethers } = require("hardhat");

/// pharoutdevs.eth address: 0x8a595cff2a07fd63cb06b101102a75fe4173f384

module.exports = async ({ getNamedAccounts, deployments }) => {

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const [testDev] = await ethers.getSigners();
  const dev = testDev.address;
  await deploy("TempMint", {
    from: deployer,
    args: [dev],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const MarketMint = await ethers.getContract("TempMint", deployer);
  
  await deploy("PhamNFTs", {
    from: deployer,
    args: ["0x8a595cff2a07fd63cb06b101102a75fe4173f384", "0x8a595cff2a07fd63cb06b101102a75fe4173f384", MarketMint.address, "https://gateway.pinata.cloud/ipfs/QmZKAYAmDfm26bQREKi7qbSxhLb972v32j6YdpwoQtJ1uo/", 125],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const NFT = await ethers.getContract("PhamNFTs", deployer);

  await MarketMint.setNftAddress(NFT.address)
  console.log("All contracts are now deployed and operational!")
  console.log("_______________________________________________")

  await MarketMint.redeemForNft(16, [
    "0x2f67a952b952593848D597102298ACf9253b841b", 
    "0x686218c292b04f4d2F6e4737C9134d6f6D8fd687", 
    "0xFcDd460A15aAD5Bc32A7CeaBb0DF9cAb1Ac7dcE4", 
    "0x16f78c6a47360531a2366BAB4c05cA28BB3222BC",
    "0xEcf786d2E9DC6919B5c22d6ffE916Ae736c9EbB0",
    "0xC839de0fEd241607d50aa4107aE582443B906e4c",
    "0x7345c5ebC0A037812a5e90B72C33A6dEcBA9AF83",
    "0x1Cae0d50b9c7191A0769c9DB5BC8089256DCD017",
    "0x846D8680978314C801AaBC12ccb5D482F9c033c1",
    "0xA48a129DD0e2CC5ffd1759673E60Dfb925dF2690",
    "0x5252aAa5CD24cBc25e7f033f8Aee99c419bE8d8f",
    "0x8A595CfF2a07fD63CB06b101102a75fe4173F384",
    "0x117fc50b84b515efe3c82d8bbb2e1fa00751fea0",
    "0x1B3FEA07590E63Ce68Cb21951f3C133a35032473",
    "0xffad5d78dd52eb9538998472a22506bdea0632c3",
    "0x846D8680978314C801AaBC12ccb5D482F9c033c1"
  ])

  await MarketMint.setMintPrice(ethers.utils.parseUnits(".1","ether"));

  // DEV_ROLE: 0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2
  await MarketMint.grantRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2", "0x8a595cff2a07fd63cb06b101102a75fe4173f384")
  await MarketMint.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000", "0x8a595cff2a07fd63cb06b101102a75fe4173f384")
  console.log("  ___________   DEFAULT_ADMIN_ROLE & DEV_ROLE granted to pharoutdevs.eth    _____________ ")
  console.log("|                                                                                         |")
  console.log("| All NFTs minted and contract accessibility handed over to the pharoutdevs.eth multisig! |")
  console.log("| _______________________________________________________________________________________ |")

};
module.exports.tags = ["MarketTempMint"];
