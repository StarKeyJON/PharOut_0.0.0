/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { use } = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const Web3 = require('web3');
const { BigNumber } = require("ethers");
// const toBN = Web3.utils.toBN;
// use(solidity);


describe("MarketPlace Bids Contract Unit Test", function() {
  it("Should interact with the Bids, Rewards, ERC721 and Mint contracts.", async function() {
    before((done) => {
      setTimeout(done, 2000);
    });
    const [testDao, testDev, userAddress] = await ethers.getSigners();

    const RoleProvider = await ethers.getContractFactory("MarketRoleProvider");
    const roleProvider = await RoleProvider.deploy();
    await roleProvider.deployed();
    const roleProviderAddress = roleProvider.address;
    console.log("Role provider Address is: ", roleProviderAddress);

    const MarketOwnerProxy = await ethers.getContractFactory("OwnerProxy");
    const ownerProxy = await MarketOwnerProxy.deploy(roleProviderAddress);
    await ownerProxy.deployed();
    const ownerProxyAddress = ownerProxy.address;
    console.log("Market Owner Proxy address is: " + ownerProxyAddress);

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const market = await NFTMarket.deploy(roleProviderAddress);
    await market.deployed()
    const marketAddress = market.address; 
    console.log("Market Address: " + marketAddress)

    const MarketMint = await ethers.getContractFactory("Mint");
    const marketMint = await MarketMint.deploy(roleProviderAddress);
    await marketMint.deployed();
    const marketMintAddress = marketMint.address;
    console.log("Market Mint Address: " + marketMintAddress)

    /// Test ERC20 token!! This is not used on mainnet!
    const PHAMToken = await ethers.getContractFactory("PhamToken");
    const token = await PHAMToken.deploy(testDao.address);
    await token.deployed()
    const tokenAddress = token.address;
    console.log("PHAM Token Address: " + tokenAddress)
    const amnt = await token.balanceOf(testDao.address);
    const tokenamount = BigNumber.from(amnt);
    console.log("Deployer address has a total of " + ethers.utils.formatUnits(tokenamount) + " PHAM Tokens.");

    const NFT = await ethers.getContractFactory("PhamNFTs");
    const phamNft = await NFT.deploy(testDao.address, testDao.address, testDev.address, "https://ipfs.io/ipfs/", 20);
    await phamNft.deployed()
    const phamNftContractAddress = phamNft.address;
    console.log("PhamNFTs Contract Address: "+ phamNftContractAddress)

    const MarketBids = await ethers.getContractFactory("MarketBids");
    const marketBids = await MarketBids.deploy(roleProviderAddress);
    await marketBids.deployed();
    const marketBidsAddress = marketBids.address;
    console.log("Bids Address: " + marketBidsAddress)
  
    const MarketCollections = await ethers.getContractFactory("MarketCollections");
    const marketCollections = await MarketCollections.deploy(roleProviderAddress);
    await marketCollections.deployed();
    const marketCollectionsAddress = marketCollections.address;
    console.log("CollectionsAddress: " + marketCollectionsAddress)
  
    const MarketOffers = await ethers.getContractFactory("MarketOffers");
    const marketOffers = await MarketOffers.deploy(roleProviderAddress);
    await marketOffers.deployed();
    const marketOffersAddress = marketOffers.address;
    console.log("Offers Address: " + marketOffersAddress)
  
    const MarketTrades = await ethers.getContractFactory("MarketTrades");
    const marketTrades = await MarketTrades.deploy(roleProviderAddress);
    await marketTrades.deployed();
    const marketTradesAddress = marketTrades.address;
    console.log("Trades Address: " + marketTradesAddress)

    const RewardsController = await ethers.getContractFactory("RewardsControl");
    const rewardsController = await RewardsController.deploy(roleProviderAddress, tokenAddress)
    await rewardsController.deployed();
    const rewardsControllerAddress = rewardsController.address;
    console.log("Rewards Controller address is: ", rewardsControllerAddress);

    // Initializing all the addresses in the Role Provider
    await roleProvider.setDaoAdd(testDao.address);
    await roleProvider.setMarketAdd(marketAddress);
    await roleProvider.setMarketMintAdd(marketMintAddress);
    await roleProvider.setCollectionsAdd(marketCollectionsAddress);
    await roleProvider.setOffersAdd(marketOffersAddress);
    await roleProvider.setTradesAdd(marketTradesAddress);
    await roleProvider.setBidsAdd(marketBidsAddress);
    await roleProvider.setRwdsAdd(rewardsControllerAddress);
    await roleProvider.setRoleAdd(roleProviderAddress);
    await roleProvider.setOwnerProxyAdd(ownerProxyAddress);
    await roleProvider.setPhunkyAdd(tokenAddress);
    await roleProvider.setDevSigAddress(testDao.address);
    await roleProvider.setNftAdd(phamNftContractAddress);
    /// Assiging mint contract minter role
    await phamNft.grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", marketMintAddress);

    // CONTRACT_ROLE: bytes32: 0x364d3d7565c7a8300c96fd53e065d19b65848d7b23b3191adcd55621c744223c
    // PROXY_ROLE: bytes32: 0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b
    // DEV_ROLE: bytes32:0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2
    await roleProvider.grantRole("0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b",ownerProxyAddress);
    await ownerProxy.setProxyRole(testDao.address, 1)
    await ownerProxy.setProxyRole(testDev.address, 1)

    console.log("Initialized all the contract addresses to the Owner Proxy contract and assigned PROXY_ROLE.")
    /// Setting the total amount of NFTs minted in the available NFTs array
    const tokens = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    await marketMint.setNftTokenIds(tokens);
    console.log("Nft ids set with: ", tokens)

    const address = testDao.address;
    const balance = await ethers.provider.getBalance(address);
    const eth = ethers.utils.formatEther(balance);
    console.log(address, eth);
    await rewardsController.addDev(testDev.address);
    
    await marketMint.setNewRedemption(20, tokenAddress);
    await marketMint.fetchRedemptionTokens().then(async(ack) =>{
      expect(await ack[0].redeemAmount.toNumber() === 20)
    })
    await marketCollections.setTokenList([true], [tokenAddress])
    console.log("Token list set")
    await token.approve(marketMintAddress, 1000)
    console.log("Token approved")

    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)
    await marketMint.redeemForNft(1)

    // Verifying the item struct and data is saved correctly
    await marketMint.fetchNFTsCreated().then(res=>{
        res.forEach(item=>{
          console.log("item Id: ",item.itemId.toNumber())
          console.log("token Id: ",item.tokenId.toNumber())
          console.log("Contract address: ",item.contractAddress)
        })
      })

    console.log("")
    console.log("-------------")
    console.log("")
    console.log("User Rewards holdings")
    await rewardsController.fetchUserRewardTokens().then(async(res)=>{
      console.log("tokenId: ",res[0].tokenId.toNumber())
      console.log("tokenAmount: ",res[0].tokenAmount.toNumber())
      console.log("tokenAddress: ", res[0].tokenAddress)
    })
    console.log("")
    console.log("-------------")
    console.log("")
    console.log("DEV Rewards holdings")
    await rewardsController.fetchDevRewardTokens().then(async(res)=>{
      console.log("tokenId: ",res[0].tokenId.toNumber())
      console.log("tokenAmount: ",res[0].tokenAmount.toNumber())
      console.log("tokenAddress: ", res[0].tokenAddress)
    })
    console.log("")
    console.log("-------------")
    console.log("")
    console.log("DAO Rewards holdings")
    await rewardsController.fetchDaoRewardTokens().then(async(res)=>{
      console.log("tokenId: ",res[0].tokenId.toNumber())
      console.log("tokenAmount: ",res[0].tokenAmount.toNumber())
      console.log("tokenAddress: ", res[0].tokenAddress)
    })
    const balance2 = await ethers.provider.getBalance(testDao.address);
    const eth2 = ethers.utils.formatEther(balance2);
    console.log("-------------")
    console.log("Dao ETH holdings before claim: ", eth2)
    console.log("-------------")
    const ERCbalance = await token.balanceOf(testDao.address);
    const erc = ethers.utils.formatEther(ERCbalance);
    console.log("Dao ERC holdings before claim: ", erc)
    console.log("")
    console.log("-------------")
    console.log("")
    await rewardsController.connect(testDao).claimDaoRewards();
    
    await rewardsController.fetchDaoRewardTokens().then(async(res)=>{
      console.log("tokenId: ",res[0].tokenId.toNumber())
      console.log("tokenAmount: ",res[0].tokenAmount.toNumber())
      console.log("tokenAddress: ",res[0].tokenAddress)
    })
    const ERCbalance2 = await ethers.provider.getBalance(testDao.address);
    const erc2 = ethers.utils.formatEther(ERCbalance2);
    console.log("Dao ETH holdings after claim: ", erc2)
    const balance3 = await token.balanceOf(testDao.address);
    const eth3 = ethers.utils.formatEther(balance3);
    console.log("-------------")
    console.log("Dao ERC holdings after claim: ", eth3)
    console.log("-------------")
    await rewardsController.setClaimClock()
    console.log("Claim Clock")
    console.log("")
    console.log("-------------")
    console.log("")
    await rewardsController.fetchClaimTime().then(async(res)=>{
      console.log("Aplha time: ", res.alpha.toNumber())
      console.log("Delta time: ",res.delta.toNumber())
      console.log("Omega time: ",res.omega.toNumber())
      console.log("How many users: ", res.howManyUsers.toNumber())
    })
})})
