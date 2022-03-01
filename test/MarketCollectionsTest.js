/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { use, Assertion } = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const Web3 = require('web3');
// const toBN = Web3.utils.toBN;
// use(solidity);


describe("MarketPlace Collections Contract Unit Test", function() {
  it("Should interact with the Mappings in Collections.", async function() {
    before((done) => {
      setTimeout(done, 2000);
    });
    const [deployer] = await ethers.getSigners();

    const RoleProvider = await ethers.getContractFactory("MarketRoleProvider");
    const roleProvider = await RoleProvider.deploy(deployer.address);
    await roleProvider.deployed();
    const roleProviderAddress = roleProvider.address;
    console.log("Role provider Address is: ", roleProviderAddress);

    await roleProvider.setRoleAdd(roleProviderAddress);

    const MarketCollections = await ethers.getContractFactory("MarketCollections");
    const marketCollections = await MarketCollections.deploy(roleProviderAddress);
    await marketCollections.deployed();
    const marketCollectionsAddress = marketCollections.address;
    console.log("CollectionsAddress: " + marketCollectionsAddress)

    await roleProvider.setCollectionsAdd(marketCollectionsAddress);

    // try at marketCollections API level
    await marketCollections.editMarketplaceContract([true], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);
    expect(await marketCollections.isRestricted("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).to.equal(true);
    await marketCollections.editMarketplaceContract([false], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);
    expect(await marketCollections.isRestricted("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).to.equal(false);
})})