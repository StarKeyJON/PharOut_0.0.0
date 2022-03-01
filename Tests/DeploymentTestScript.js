/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
const fs = require("fs");
const chalk = require("chalk");
const { ethers } = require("hardhat");
const { formatEther, parseEther } = require("ethers/lib/utils");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  console.log(deployer)
  await deploy("MarketRoleProvider", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const RoleProvider = await ethers.getContract("MarketRoleProvider", deployer);
  
  await deploy("OwnerProxy", {
    from: deployer,
    args: [ RoleProvider.address ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Controller = await ethers.getContract("OwnerProxy", deployer);

  await deploy("NFTMarket", {
    from: deployer,
    args: [ RoleProvider.address ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Market = await ethers.getContract("NFTMarket", deployer);

  await deploy("Mint", {
    from: deployer,
    args: [ RoleProvider.address ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const MarketMint = await ethers.getContract("Mint", deployer);

  await deploy("PhamToken", {
    from: deployer,
    args: ["0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f"],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Token = await ethers.getContract("PhamToken", deployer);

  await deploy("PhamNFTs", {
    from: deployer,
    args: ["0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f", "0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f", MarketMint.address, "https://gateway.pinata.cloud/ipfs/QmQcoXyYKokyBHzN3yxDYgPP25cmZkm5Gqp5bzZsTDF7cd/"],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const NFT = await ethers.getContract("PhamNFTs", deployer);

  await deploy("MarketBids", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Bids = await ethers.getContract("MarketBids", deployer);

  await deploy("MarketCollections", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Collections = await ethers.getContract("MarketCollections", deployer);

  await deploy("MarketOffers", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Offers = await ethers.getContract("MarketOffers", deployer);

  await deploy("MarketTrades", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Trades = await ethers.getContract("MarketTrades", deployer);

  await deploy("RewardsControl", {
    from: deployer,
    args: [RoleProvider.address, Token.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Rewards = await ethers.getContract("RewardsControl", deployer);
  console.log("Contracts deployed!")
  
  await RoleProvider.setDaoAdd("0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f");
  await RoleProvider.setMarketAdd(Market.address);
  await RoleProvider.setMarketMintAdd(MarketMint.address);
  await RoleProvider.setCollectionsAdd(Collections.address);
  await RoleProvider.setOffersAdd(Offers.address);
  await RoleProvider.setTradesAdd(Trades.address);
  await RoleProvider.setNftAdd(NFT.address);
  await RoleProvider.setBidsAdd(Bids.address);
  await RoleProvider.setRwdsAdd(Rewards.address);
  await RoleProvider.setRoleAdd(RoleProvider.address);
  await RoleProvider.setOwnerProxyAdd(Controller.address);
  await RoleProvider.setPhunkyAdd(Token.address);
  await RoleProvider.setDevSigAddress("0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f");
  console.log("Roles set...")
  /// Granting dev role and proxy role to test address
  /// DEV_ROLE : 0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2
  await RoleProvider.grantRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2","0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f")
  ///PROXY_ROLE : 0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b
  await RoleProvider.grantRole("0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f")

  // Setting NFT collection and Token address for approval
  await Collections.editMarketPlaceContract([false], [NFT.address]);
  await Collections.setTokenList([true], [Token.address]);

  console.log("All contracts are now deployed and operational through the ownerProxy contract!")
  console.log("______________________")
  await Rewards.setClaimClock();
  console.log("Clock set.")

};
module.exports.tags = ["MarketController"];
