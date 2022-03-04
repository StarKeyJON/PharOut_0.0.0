/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { use } = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const Web3 = require('web3');
const { utils, BigNumber } = require("ethers");
// const toBN = Web3.utils.toBN;
// use(solidity);


describe("MarketPlace Offers Contract Unit Test", function() {
  it("Should interact with the Offers, Rewards, ERC721 and Mint contracts.", async function() {
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
    console.log("Initialized all the contract addresses to the Owner Proxy contract and assigned Contract_Role.")

    /// Assiging mint contract minter role
    await phamNft.grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", marketMintAddress);

    /// Setting the total amount of NFTs minted in the available NFTs array
    const tokens = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    await marketMint.setNftTokenIds(tokens);
    console.log("Nft ids set with: ", tokens)
    // CONTRACT_ROLE: bytes32: 0x364d3d7565c7a8300c96fd53e065d19b65848d7b23b3191adcd55621c744223c
    // PROXY_ROLE: bytes32: 0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b
    console.log("Initialized all the contract addresses to the Owner Proxy contract and assigned PROXY_ROLE.")
    await roleProvider.grantRole("0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b",ownerProxyAddress);
    // DEV_ROLE: bytes32:0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2
    await ownerProxy.setProxyRole(testDao.address, 1)
    await ownerProxy.setProxyRole(testDev.address, 1)
    // await roleProvider.grantRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2",ownerProxyAddress);
    // await ownerProxy.setProxyRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2",testDao.getAddress())
    const address = await testDao.getAddress();
    const balance = await ethers.provider.getBalance(address);
    const tokenbalance = await token.balanceOf(address);
    const eth = ethers.utils.formatEther(balance);
    console.log(tokenbalance, eth);
    await marketCollections.editMarketplaceContract([false],[phamNftContractAddress])
    
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

    await rewardsController.fetchUserRewardTokens().then(async(res)=>{
      console.log(res[0].tokenId.toNumber())
      console.log(res[0].tokenAmount.toNumber())
      console.log(res[0].tokenAddress)
    })
    await rewardsController.fetchDevRewardTokens().then(async(res)=>{
      console.log(res[0].tokenId.toNumber())
      console.log(res[0].tokenAmount.toNumber())
      console.log(res[0].tokenAddress)
    })
    await rewardsController.fetchDaoRewardTokens().then(async(res)=>{
      console.log(res[0].tokenId.toNumber())
      console.log(res[0].tokenAmount.toNumber())
      console.log(res[0].tokenAddress)
    })


    // It should approve and list newly minted NFTs
    await phamNft.setApprovalForAll(marketAddress, true);
    await market.listMktItem([false,false,false], [0,0,0], [0,1,2], [ethers.utils.parseUnits("1","ether"),ethers.utils.parseUnits("1","ether"),ethers.utils.parseUnits("1","ether")], [phamNftContractAddress,phamNftContractAddress,phamNftContractAddress])
    console.log("Item 1, 2 and 3 listed for sale")
    console.log("______________________")

    await market.fetchMktItems().then((res)=>{
      res.forEach(item=>{
        const wei = BigNumber.from(item.price);
        console.log(
          {
          is1155: item.is1155,
          itemId: item.itemId.toNumber(),
          amount1155: item.amount1155.toNumber(),
          price: ethers.utils.formatUnits(wei,"ether"),
          tokenId: item.tokenId.toNumber(),
          nftContract: item.nftContract,
          seller: item.seller,
          owner: item.owner
        }
          )
      })
      
    })
    // It should sell the listed NFTs to test user 1
    await market.connect(userAddress).buyMarketItems([1], { value: ethers.utils.parseUnits("1","ether")})
    console.log("Item 1 sold to "+userAddress.address)
    await market.connect(userAddress).buyMarketItems([2], { value: ethers.utils.parseUnits("1","ether")})
    console.log("Item 2 sold to "+userAddress.address)
    await market.connect(userAddress).buyMarketItems([3], { value: ethers.utils.parseUnits("1","ether")})
    console.log("Item 3 sold to "+userAddress.address)
    
    console.log("______________________")
    await market.fetchMktItems().then((res)=>{
      res.forEach(item=>{

        console.log(
          {
          is1155: item.is1155,
          itemId: item.itemId.toNumber(),
          amount1155: item.amount1155.toNumber(),
          price: item.price.toNumber(),
          tokenId: item.tokenId.toNumber(),
          nftContract: item.nftContract,
          seller: item.seller,
          owner: item.owner
        }
          )
      })
      
    })
    console.log("______________________")
    await phamNft.connect(userAddress).setApprovalForAll(marketAddress, true);
    await market.connect(userAddress).listMktItem([false,false,false], [0,0,0], [0,1,2], [ethers.utils.parseUnits(".1","ether"),ethers.utils.parseUnits(".1","ether"),ethers.utils.parseUnits(".1","ether")], [phamNftContractAddress,phamNftContractAddress,phamNftContractAddress])
    console.log("Successfully approved marketplace and listed 3 items with new owners")
    console.log("______________________")
    await token.approve(marketOffersAddress, 600);
    await marketOffers.enterOfferForNft([1], [200], [tokenAddress], [userAddress.address])
    console.log("Placed Offer for tokenId #0 NFT, itme #1")
    await marketOffers.enterOfferForNft([2], [200], [tokenAddress], [userAddress.address])
    console.log("Placed Offer for tokenId #1 NFT, item #2")

    await marketOffers.fetchOffers().then(res=>{
      res.forEach(item=>{
        console.log({
          isActive: item.isActive,
          offerId: item.offerId.toNumber(),
          itemId: item.itemId.toNumber(),
          amount: item.amount.toNumber(),
          tokenCont: item.tokenCont,
          offerer: item.offerer,
          seller: item.seller
        })
      })
    })


    await marketOffers.enterBlindOffer([false], [0], [0], [200], [tokenAddress],["0xf07468ead8cf26c752c676e43c814fee9c8cf402"])
    console.log("Successfully entered a blind offer on CryptoPhunks v2 tokenId #0, contract address 0xf07468ead8cf26c752c676e43c814fee9c8cf402")

    let offers = await marketOffers.fetchBlindOffers()
    console.log("Market Blind Offers: " + offers)
    await marketOffers.withdrawOffer([1],[true]);
    console.log("Successfully withdrew Blind offer.")
    offers = await marketOffers.fetchBlindOffers()
    console.log("Market Blind Offers: " + offers)
    await marketOffers.connect(userAddress).acceptOfferForNft([1]);
    console.log("Accepted Offer for #1 NFT")
    
    await marketOffers.fetchOffers().then(res=>{
      res.forEach(item=>{
        console.log({
          isActive: item.isActive,
          offerId: item.offerId.toNumber(),
          itemId: item.itemId.toNumber(),
          amount: item.amount.toNumber(),
          tokenCont: item.tokenCont,
          offerer: item.offerer,
          seller: item.seller
        })
      })
    })

    await marketOffers.connect(userAddress).acceptOfferForNft([2]);
    console.log("______________________")
    console.log("Accepted Offer for #2 NFT")
    await marketOffers.fetchOffers().then(res=>{
      res.forEach(item=>{
        console.log({
          isActive: item.isActive,
          offerId: item.offerId.toNumber(),
          itemId: item.itemId.toNumber(),
          amount: item.amount.toNumber(),
          tokenCont: item.tokenCont,
          offerer: item.offerer,
          seller: item.seller
        })
      })
    })
    console.log("______________________")
    offers = await marketOffers.fetchBlindOffers()
    console.log("Market Blind Offers: " + offers)
    console.log("______________________")
    await market.fetchMktItems().then((res)=>{
      res.forEach(item=>{

        console.log(
          {
          is1155: item.is1155,
          itemId: item.itemId.toNumber(),
          amount1155: item.amount1155.toNumber(),
          price: ethers.utils.formatEther(item.price),
          tokenId: item.tokenId.toNumber(),
          nftContract: item.nftContract,
          seller: item.seller,
          owner: item.owner
        }
          )
      })
      
    })
})})
