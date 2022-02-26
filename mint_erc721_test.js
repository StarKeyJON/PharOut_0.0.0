/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { use } = require("chai");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const Web3 = require('web3');
// const toBN = Web3.utils.toBN;
// use(solidity);


describe("MarketPlace Mint ERC721 Contract Unit Test", function() {
  it("Should interact with the ERC721 and Mint contracts.", async function() {
    before((done) => {
      setTimeout(done, 2000);
    });
    const [testDao, testDev, userAddress] = await ethers.getSigners();

    const RoleProvider = await ethers.getContractFactory("MarketRoleProvider");
    const roleProvider = await RoleProvider.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
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
    const token = await PHAMToken.deploy('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    await token.deployed()
    const tokenAddress = token.address;
    console.log("PHAM Token Address: " + tokenAddress)
    const amnt = await token.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    console.log("Deployer address has a total of " + amnt.toNumber() + " PHAM Tokens.");

    const NFT = await ethers.getContractFactory("PhamNFTs");
    const phamNft = await NFT.deploy('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', marketMintAddress, "https://ipfs.io/ipfs/");
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
    await roleProvider.setDevSigAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await roleProvider.setNftAdd(phamNftContractAddress);
    console.log("Initialized all the contract addresses to the Owner Proxy contract and assigned Contract_Role.")
    await roleProvider.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000",ownerProxyAddress);
    await ownerProxy.setProxyRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2","0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    const address = await testDev.getAddress();
    const balance = await ethers.provider.getBalance(address);
    const eth = ethers.utils.formatEther(balance);
    console.log(address, eth);
    
    await marketMint.setNewRedemption(200, tokenAddress);
    await marketMint.fetchRedemptionTokens().then(async(ack) =>{
      expect(await ack[0].redeemAmount.toNumber() === 200)
    })
    await marketCollections.setTokenList([true], [tokenAddress])
    await token.approve(marketMintAddress, 1000)
    await marketMint.redeemForNft(1, 1000, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    .then(async(res)=>{
        console.log(res)
      })

    // Verifying the item struct and data is saved correctly
    await marketMint.fetchNFTsCreated().then(async(res)=>{
      expect(await res[0].itemId.toNumber() === 1);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 2);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 3);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 4);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 5);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });

    await marketMint.fetchNFTsCreatedByAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266").then(async(res)=>{
      expect(await res[0].itemId.toNumber() === 1);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 2);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 3);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 4);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await res[0].itemId.toNumber() === 5);
      expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
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


    /// OLD CODE -- DEFUNCT
    // await marketMint.redeemForNft(0, 100, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
    // // Granting PROXY and CONTRACT roles to contract to interact through OwnerProxy contract
    // await ownerProxy.setProxyRoles(["0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b","0x77d72916e966418e6dc58a19999ae9934bef3f749f1547cde0a86e809f19c89b"],
    // [ownerProxyAddress,marketMintAddress,marketAddress, nftContractAddress,marketCollectionsAddress, marketOffersAddress, marketTradesAddress, marketBidsAddress, rewardsControllerAddress,nftFactoryAddress,nft1155FactoryAddress])
    // await ownerProxy.setProxyRoles(["0x364d3d7565c7a8300c96fd53e065d19b65848d7b23b3191adcd55621c744223c","0x364d3d7565c7a8300c96fd53e065d19b65848d7b23b3191adcd55621c744223c","0x364d3d7565c7a8300c96fd53e065d19b65848d7b23b3191adcd55621c744223c"],
    // [ marketOffersAddress, marketTradesAddress, marketBidsAddress,])


//     // Setting addresses 
//     await ownerProxy.setRoleAdd(roleProviderAddress);
//     console.log("Set roles address for all contracts");

//     await ownerProxy.setNftAdd(nftContractAddress);
//     console.log("Set NFT contract address for all contracts")
//     await ownerProxy.setMarketMintAdd(marketMintAddress);
//     console.log("Successfully set Mint, nft and token address to ownerProxy for interaction")
//     await ownerProxy.setFactoryAdd(nftFactoryAddress);
//     console.log("Set ERC721 Factory address for the mint contract.")
//     await ownerProxy.set1155FactoryAdd(nft1155FactoryAddress);
//     console.log("Set ERC1155 Factory address for the mint contract.")
    
//     await ownerProxy.setControlAdd();
//     console.log("set owner proxy address.")
//     await ownerProxy.setMarketAdd(marketAddress);
//     console.log("Set market address for ownerProxy")
//     await ownerProxy.setOffersAdd(marketOffersAddress);
//     console.log("Set offer address for ownerProxy")
//     await ownerProxy.setRwdsAdd(rewardsControllerAddress);
//     console.log("Set rewards address for ownerProxy");
//     await ownerProxy.setTradesAdd(marketTradesAddress);
//     console.log("Set trades address for ownerProxy")
//     await ownerProxy.setBidsAdd(marketBidsAddress);
//     console.log("Set bids address for ownerProxy")
//     await ownerProxy.setCollectionsAdd(marketCollectionsAddress);
//     console.log("Set collections address for owner proxy and marketplace")
//     console.log("______________________")

//     await ownerProxy.setMintNftFactoryAdd(nftFactoryAddress);
//     console.log("Set Market Mint contract with new ERC 721 NFT Factory address")
//     await ownerProxy.setMintNft1155FactoryAdd(nft1155FactoryAddress);
//     console.log("Set Market Mint contract with new ERC 1155 NFT Factory address")
//     await ownerProxy.setMintRedemptionToken(250, tokenAddress);
//     console.log("Set Market Mint contract with redemption token address")
//     await ownerProxy.setNewMintRedemption(250, tokenAddress);
//     console.log("Successfully set Market Mint contract with new redemption token address")
//     console.log("______________________")
//     console.log("All contracts are now deployed and operational through the ownerProxy contract!")
//     console.log("______________________")

//     // It should approve to spend PHAM tokens to mint NFT's
//     await token.approve(marketMintAddress, 25000)
//     console.log("Succesfully approved Market Market Mint to spend ERC20 tokens")
//     await marketMint.redeemForNft(1, 250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1, 250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/QmZAvXxyxzQfb6GnajSxUNe53W9zyqEWGs1XaJuoCMfCpF")
//     await marketMint.redeemForNft(1, 250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/QmZZQTvaHCM7Cug8Hrb4gd7SLJ1witEcwjMHsv8YQpZ9WG")
//     console.log("Successfully redeemed 3 NFTs with ERC20 tokens")
//     console.log("______________________")

//     // It should approve and list newly minted NFTs
//     await nft.setApprovalForAll(marketAddress, true);
//     await market.listMktItem([false,false,false], [0,0,0], [0,1,2], [10000,10000,10000], [nftContractAddress,nftContractAddress,nftContractAddress])
//     console.log("Item 1, 2 and 3 listed for sale")
//     console.log("______________________")

//     // It should sell the listed NFTs to 3 different users
//     await market.connect(userAddress).buyMarketItems([1], { value: 10000})
//     console.log("Item 1 sold to "+userAddress.address)
//     await market.connect(userAddress2).buyMarketItems([2], { value: 10000})
//     console.log("Item 2 sold "+userAddress2.address)
//     await market.connect(userAddress2).buyMarketItems([3], { value: 10000})
//     console.log("Item 3 sold "+userAddress3.address)
    
//     console.log("______________________")
//     console.log("______________________")
//     console.log("______________________")

//     await nft.connect(userAddress).setApprovalForAll(marketAddress, true)
//     await market.connect(userAddress).listMktItem([false], [0], [0], [150], [nftContractAddress])
//     await nft.connect(userAddress2).setApprovalForAll(marketAddress, true)
//     await market.connect(userAddress2).listMktItem([false], [0], [1], [180], [nftContractAddress])
//     await nft.connect(userAddress2).setApprovalForAll(marketAddress, true)
//     await market.connect(userAddress2).listMktItem([false], [0], [2], [200], [nftContractAddress])
//     console.log("Successfully approved marketplace and listed 3 items with new owners")

//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     await marketMint.redeemForNft(1,250, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.io/ipfs/Qmeq3agZdqytsuLasPcYkwv15egiUrRM57Rdf5eJpYE1r4")
//     console.log("Successfully redeemed 12 NFTs with ERC20 tokens from Market Mint")
//     console.log("______________________")

//     // /* Does list and Delist */
//     await nft.setApprovalForAll(marketAddress, true)
//     await market.listMktItem([false], [0], [3], [100], [nftContractAddress])
//     console.log("Successfully listed #3 NFT")
//     // Storage arrays recycle old itemIds
//     await market.delistMktItems([4])
//     console.log("Successfully delisted #1 NFT")
//     // /* */
//     await nft.setApprovalForAll(marketAddress, true);
//     await market.listMktItem([false], [0], [4], [100], [nftContractAddress])
//     console.log("Successfully listed #4 NFT")
//     const listings2 = await market.fetchMktItems();
//     await Promise.all(listings2.map(async i => {
//       // if(i.isForSale){
//         console.log({
//           is1155: i.is1155,
//           itemId: i.itemId.toNumber(),
//           amount1155: i.amount1155.toNumber(),
//           price: i.price.toNumber(),
//           tokenId: i.tokenId.toNumber(),
//           nftContract: i.nftCont,
//           seller: i.seller,
//           owner: i.owner
//         })
        
//     // }

//   }))
//     await market.delistMktItems([4])
//     console.log("Tests passed for listing and delisting")
    
//     await nft.setApprovalForAll(marketAddress, true)
//     await market.listMktItem([false], [0], [4], [100], [nftContractAddress])
//     await market.listMktItem([false], [0], [5], [100], [nftContractAddress])
//     await market.listMktItem([false], [0], [6], [100], [nftContractAddress])
//     await market.listMktItem([false], [0], [7], [100], [nftContractAddress])
//     await market.listMktItem([false], [0], [8], [100], [nftContractAddress])
//     await market.listMktItem([false], [0], [9], [100], [nftContractAddress])
//     console.log("Listed 6 of the newly created NFTs")
//     await market.connect(userAddress).buyMarketItems([7], { value: 100})
//     console.log("Item 1 sold to "+userAddress.address)
//     await market.connect(userAddress2).buyMarketItems( [8], { value: 100})
//     console.log("Item 2 sold "+userAddress2.address)
//     await market.connect(userAddress2).buyMarketItems( [9], { value: 100})
//     console.log("Item 3 sold "+userAddress3.address)
//     console.log("______________________")
//     await marketBids.connect(userAddress3).enterBidForNft([6], [6], [200], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], { value: 200})
//     console.log("Placed Bid for #6 NFT")
//     await marketBids.connect(userAddress3).enterBidForNft([5], [5], [300], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], { value: 300})
//     console.log("Placed Bid for #5 NFT")
//     await marketBids.connect(userAddress).enterBlindBid([false],[2000], [0], [0],["0xf07468ead8cf26c752c676e43c814fee9c8cf402"],{ value: 2000})
//     console.log("Successfully entered a blind bid on CryptoPhunks v2 tokenId #0, contract address 0xf07468ead8cf26c752c676e43c814fee9c8cf402")
//     // await marketBids.connect(userAddress).withdrawBid([])
//     let bids = await marketBids.fetchBlindBidItems()
//     console.log("Market Blind Bids: " + bids)
//     await marketBids.connect(userAddress).withdrawBid([1],[true]);
//     console.log("Successfully withdrew Blind bid.")
//     bids = await marketBids.fetchBlindBidItems()
//     console.log("Market Blind Bids: " + bids)
//     await marketBids.acceptBidForNft([2]);
//     console.log("Accepted Bid for #5 NFT")
    
  

//     await marketBids.acceptBidForNft([1]);
//     console.log("Accepted Bid for #6 NFT")
//     bids = await marketBids.fetchBidItems()
//     console.log("Market Bids: " + bids)
//     await nft.connect(userAddress3).setApprovalForAll(marketAddress, true)
//     await market.connect(userAddress3).listMktItem([false], [0], [5], [200], [nftContractAddress])
//     console.log("Successfully listed nft #5 with address3")
    
//     await nft.connect(userAddress3).approve(marketTradesAddress, 6);
//     console.log("UserAddress3 approved marketTradesAddress to use NFT")
//     await marketTrades.connect(userAddress3).enterTrade([0], [2], [6], [nftContractAddress], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"])
//     console.log("Trade entered for market item 2 by Address3 offering NFT id #6 ")
//     const trades = await marketTrades.fetchTrades()
//     console.log("Market Trades: " + trades)
//     await marketTrades.acceptTrade([2],[1]);
//     console.log("Trade successfully accepted!")

//     await token.approve(marketOffersAddress, 10000)
//     console.log("Successfully approved marketOffers contract to interact with 10,000 ERC20 tokens")
//     await marketOffers.enterOfferForNft( [3], [10000], [tokenAddress], ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"])
//     console.log("Successfully entered ERC20 to offer for itemId #3, tokenId #0")
//     const offers = await marketOffers.fetchOffers()
//     console.log("Market Offers: " + offers)
//     await marketOffers.acceptOfferForNft([1]);
//     console.log("Successfully accepted ERC20 Offer for NFT item!!!")

//     console.log(await rewardsController.fetchUserEthRewards("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))

//     await market.delistMktItems([4]);
//     console.log("Successfully delisted all items for Address3!")
//       // It should mint 1155 NFT
//     await nft1155.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", [1], [10], "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
//     await nft1155.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", [2], [10], "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
//     await nft1155.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", [3], [10], "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
//     console.log("Succesfully minted 3 sets of 10 ERC1155 NFTs")

//     await nft1155.setApprovalForAll(marketAddress, true);
//     console.log("Successfully set approval")
//     await market.listMktItem([true], [10], [1], [10000], [nft1155ContractAddress])
//     console.log("Successfully listed ERC1155's for sale on market")

//     const listingsa = await market.fetchMktItems();

//     await Promise.all(listingsa.map(async i => {
//         console.log({
//           is1155: i.is1155,
//           itemId: i.itemId.toNumber(),
//           amount1155: i.amount1155.toNumber(),
//           price: i.price.toNumber(),
//           tokenId: i.tokenId.toNumber(),
//           nftContract: i.nftCont,
//           seller: i.seller,
//           owner: i.owner
//         })
//   }))

//     await market.connect(userAddress).buyMarketItems([4], { value: 10000})
//     console.log("Successfully bought ERC1155!")

//     await nft1155.setApprovalForAll(marketTradesAddress, true);
//     await marketTrades.enterBlindTrade([true],[false],[0],[2],[10],[nft1155ContractAddress],[nftContractAddress])
//     console.log("Successfully entered blind trade with 10 ERC155!!")

//     const blindBids = await marketBids.fetchBlindBidItems()
//     await Promise.all(blindBids.map(async i => {
//       console.log({
//         specific: i.specific,
//         tokenId: i.tokenId.toNumber(),
//         bidId: i.bidId.toNumber(),
//         bidValue: i.bidValue.toNumber(),
//         amount: i.amount.toNumber(),
//         collectionBid: i.collectionBid,
//         bidder: i.bidder
//       })
// }))

//     const blindTrades = await marketTrades.fetchBlindTrades();
//     await Promise.all(blindTrades.map(async i =>{
//       console.log({
//         is1155: i.is1155,
//         isActive: i.isActive,
//         isSpecific: i.isSpecific,
//         wantedId: i.wantedId.toNumber(),
//         tradeId: i.tradeId.toNumber(),
//         tokenId: i.tokenId.toNumber(),
//         amount1155: i.amount1155.toNumber(),
//         nftCont: i.nftCont,
//         wantCont: i.wantCont,
//         trader: i.trader
//       })
//     }))
//     await marketTrades.connect(userAddress2).acceptBlindTrade([1],[2],[1])
//     console.log("Successfully accepted blind trade for non specific item (collection wide trade), trading ERC1155 for ERC721")
// 
})})
