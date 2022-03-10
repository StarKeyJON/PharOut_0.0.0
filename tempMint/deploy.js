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
  const [testDev] = await ethers.getSigners();

  await deploy("TempMint", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [testDev.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const MarketMint = await ethers.getContract("TempMint", deployer);
  
  await deploy("PhamNFTs", {
    from: deployer,
    args: ["0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f", "0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f", MarketMint.address, "https://gateway.pinata.cloud/ipfs/QmZKAYAmDfm26bQREKi7qbSxhLb972v32j6YdpwoQtJ1uo/", 125],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const NFT = await ethers.getContract("PhamNFTs", deployer);

  await MarketMint.setNftAddress(NFT.address)
  console.log("All contracts are now deployed and operational!")
  await MarketMint.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000", "0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f")
  console.log("______________________")

};
module.exports.tags = ["MarketTempMint"];
