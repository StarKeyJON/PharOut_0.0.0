/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { use, Assertion } = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const Web3 = require('web3');
const { BigNumber } = require("ethers");
// const toBN = Web3.utils.toBN;
// use(solidity);


describe("MarketPlace TempMint Contract Unit Test", function() {
  it("Should interact with the Redeem and Mint function in TempMint & PhamNFTs contracts.", async function() {
    before((done) => {
      setTimeout(done, 2000);
    });
    const [deployer] = await ethers.getSigners();

    const TempMint = await ethers.getContractFactory("TempMint");
    const mint = await TempMint.deploy(deployer.address);
    await mint.deployed();
    const mintAddress = mint.address;
    console.log("TempMint provider Address is: ", mintAddress);

    const NFT = await ethers.getContractFactory("PhamNFTs");
    const phamNft = await NFT.deploy(deployer.address, deployer.address, mintAddress,  "https://gateway.pinata.cloud/ipfs/QmVyyQykCCehRFadA2oDxqbfQH21e5WcAMZQ9SHJx6E6Hg/", 125);
    await phamNft.deployed()
    const phamNftContractAddress = phamNft.address;
    console.log("PhamNFTs Contract Address: "+ phamNftContractAddress)
    

    await mint.setNftAddress(phamNftContractAddress)
  
    console.log("All contracts are now deployed and operational! Mint is loaded with 125 tokenIds!")
    await mint.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000", "0xE78E38A6AeCdf8C50CBbDE3063A9412dBc9F376f")

    await mint.fetchMintPrice().then(res=>{
        const wei = BigNumber.from(res);
        console.log("Mint Price", ethers.utils.formatEther(wei,"ether"))
    })
        console.log("______________________")
    await mint.redeemForNft(5,{value: ethers.utils.parseUnits(".5","ether")})
    console.log("Minted 5 NFTs!")
    await mint.fetchNFTsCreatedCount().then(res=>{
        console.log(res.toNumber(), " NFTs created!")
    })
    console.log("______________________")
    await mint.redeemForNft(5,{value: ethers.utils.parseUnits(".5","ether")})
    console.log("Minted 5 more NFTs!")
    await mint.fetchNFTsCreatedCount().then(res=>{
        console.log(res.toNumber(), " NFTs created!")
    })
    console.log("______________________")
    await mint.redeemForNft(5,{value: ethers.utils.parseUnits(".5","ether")})
    console.log("Minted 5 more NFTs!")
    await mint.fetchNFTsCreatedCount().then(res=>{
        console.log(res.toNumber(), " NFTs created!")
    })
    console.log("______________________")
    await mint.redeemForNft(5,{value: ethers.utils.parseUnits(".5","ether")})
    console.log("Minted 5 more NFTs!")
    await mint.fetchNFTsCreatedCount().then(res=>{
        console.log(res.toNumber(), " NFTs created!")
    })
    console.log("______________________")
    await mint.fetchNFTsCreated().then(ack=>{
        ack.forEach(res=>{
            console.log({
                tokenId: res.tokenId.toNumber(),
                contractAddress: res.contractAddress,
                minter: res.minter
            })
        })
        
    })
})})
