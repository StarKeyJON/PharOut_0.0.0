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
    args: [ deployer ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const RoleProvider = await ethers.getContract("MarketRoleProvider", deployer);
  try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: RoleProvider.address,
        contract: "contracts/RoleProvider.sol:MarketRoleProvider",
        contractArguments: [deployer],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("OwnerProxy", {
    from: deployer,
    args: [ RoleProvider.address ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Controller = await ethers.getContract("OwnerProxy", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Controller.address,
        contract: "contracts/OwnerProxy.sol:OwnerProxy",
        contractArguments: [RoleProvider.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("NFTMarket", {
    from: deployer,
    args: [ RoleProvider.address ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Market = await ethers.getContract("NFTMarket", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Market.address,
        contract: "contracts/NFTMarket.sol:NFTMarket",
        contractArguments: [RoleProvider.address ],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("Mint", {
    from: deployer,
    args: [ RoleProvider.address ],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const MarketMint = await ethers.getContract("Mint", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: MarketMint.address,
        contract: "contracts/marketMint.sol:Mint",
        contractArguments: [RoleProvider.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("PhamToken", {
    from: deployer,
    args: ["0x1B3FEA07590E63Ce68Cb21951f3C133a35032473"],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Token = await ethers.getContract("PhamToken", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Token.address,
        contract: "contracts/PhamToken.sol:PhamToken",
        contractArguments: ["0x1B3FEA07590E63Ce68Cb21951f3C133a35032473"],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("PhamNFTs", {
    from: deployer,
    args: [deployer, deployer, MarketMint.address, "https://phunkfinder.com/api/phunks/"],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const NFT = await ethers.getContract("PhamNFTs", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: NFT.address,
        contract: "contracts/PhamNFTs.sol:PhamNFTs",
        contractArguments: [deployer, deployer, MarketMint.address, "https://phunkfinder.com/api/phunks/"],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("MarketBids", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Bids = await ethers.getContract("MarketBids", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Bids.address,
        contract: "contracts/MarketBids.sol:MarketBids",
        contractArguments: [RoleProvider.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("MarketCollections", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Collections = await ethers.getContract("MarketCollections", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Collections.address,
        contract: "contracts/MarketCollections.sol:MarketCollections",
        contractArguments: [RoleProvider.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("MarketOffers", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Offers = await ethers.getContract("MarketOffers", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Offers.address,
        contract: "contracts/MarketOffers.sol:MarketOffers",
        contractArguments: [RoleProvider.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("MarketTrades", {
    from: deployer,
    args: [RoleProvider.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Trades = await ethers.getContract("MarketTrades", deployer);
try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Trades.address,
        contract: "contracts/MarketTrades.sol:MarketTrades",
        contractArguments: [RoleProvider.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await deploy("RewardsControl", {
    from: deployer,
    args: [RoleProvider.address, Token.address],
    log: true,
    waitConfirmations: 5,
    LibraryName: "./node_modules/@openzeppelin",
  });
  const Rewards = await ethers.getContract("RewardsControl", deployer);
  console.log("Contracts deployed!")
  try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: Rewards.address,
        contract: "contracts/RewardsControl.sol:RewardsControl",
        contractArguments: [RoleProvider.address, Token.address],
        LibraryName: "./node_modules/@openzeppelin",
      });
    }
  } catch (error) {
    console.error(error);
  }

  await RoleProvider.setDaoAdd(deployer);
  await RoleProvider.setMarketAdd(Market.address);
  await RoleProvider.setMarketMintAdd(MarketMint.address);
  await RoleProvider.setCollectionsAdd(Collections.address);
  await RoleProvider.setOffersAdd(Offers.address);
  await RoleProvider.setTradesAdd(Trades.address);
  await RoleProvider.setNftAdd(NFT.address);
  await RoleProvider.setBidsAdd(Bids.address);
  await RoleProvider.setRwdsAdd(Rewards.address);
  await RoleProvider.setOwnerProxyAdd(Controller.address);
  await RoleProvider.setRoleAdd(RoleProvider.address);
  await RoleProvider.setPhunkyAdd(Token.address);
  await RoleProvider.setDevSigAddress(deployer);
  await RoleProvider.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000",Controller.address);
  await RoleProvider.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000","0x1B3FEA07590E63Ce68Cb21951f3C133a35032473");
  await Controller.setProxyRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2",deployer);
  await Controller.setProxyRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2","0x1B3FEA07590E63Ce68Cb21951f3C133a35032473");
  console.log("All contracts are now deployed and operational through the ownerProxy contract!")
  console.log("______________________")
};
module.exports.tags = ["MarketController"];
