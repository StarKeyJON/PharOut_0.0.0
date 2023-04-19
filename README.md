# PharOut_0.0.0
<h3>
NFT Marketplace and social media platform
  </h3>

![Market Diagram](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/pharoutmarketdiagram.png)
<p>
A NFT marketplace that allows the trading of any NFT collection, purchasing of NFTs in ETH, bidding in ETH and offering ERC20's.
Place a "blind" bid, trade or ERC20 offer on any specific unlisted item or collection-wide(any NFT holder of that collection can claim).
  </p>
  </br>
  <h4>
  Current Rinkeby Testnet Deployments:
  </h4>
  <ul>
  <li>TempMint.sol: https://rinkeby.etherscan.io/address/0xfeCeBb1b1783FAEfa8950ead10157b60c6233040#code</li>
  <li>(TempMint)PhamNFTs.sol: https://rinkeby.etherscan.io/address/0xF9207B05aC06d6bcFe4008BAc5B21D734b875cCD#code</li>
  <li>RoleProvider.sol: https://rinkeby.etherscan.io/address/0x3591e887951788A156F95bb5f15A416ECd798a55#code</li>
  <li>OwnerProxy.sol: https://rinkeby.etherscan.io/address/0xCE72a5f7DfB341ef64323109092490b879bf18a5#code</li>
  <li>NFTMarket.sol: https://rinkeby.etherscan.io/address/0xe662543382768A437fc038F9a3D86B62428ffF34#code</li>
  <li>Mint.sol: https://rinkeby.etherscan.io/address/0x62fb03478be9d0faE200448C540B1F8E07fcAD84#code</li>
  <li>PhamToken.sol: (For testing purpose only) https://rinkeby.etherscan.io/address/0xb940fC43D47186759340E44C7Fe782818c085cCa#code</li>
  <li>PhamNFTs.sol: https://rinkeby.etherscan.io/address/0x24aA6B795f1Fc2db6922FFC3DA0014d614D139c1#code</li>
  <li>MarketBids.sol: https://rinkeby.etherscan.io/address/0xB65a54f647e66E36BB921f3DE796ac4A086776ea#code</li>
  <li>MarketCollections.sol: https://rinkeby.etherscan.io/address/0x5E9C9a9F4faBB0a8b249a32eF7E2dae3440232F9#code</li>
  <li>MarketOffers.sol: https://rinkeby.etherscan.io/address/0xAE8F893066D2C9EC692157Be3525D93dc11f5bc3#code</li>
  <li>MarketTrades.sol: https://rinkeby.etherscan.io/address/0x50153709cAda123eaE67f7Fc5CbfE768Ff8E9cE1#code</li>
  <li>RewardsController.sol: https://rinkeby.etherscan.io/address/0x0a2061DF8A17a1d53F614221060A917646c9d03e#code</li>
  </ul>
</br>
# Rewards
<h4>
Platform fees are set by the DAO, initialized at 2%.
  </h4>
If you hold a platform NFT(redeemable with PHUNKY or other tokens set by the DAO), there is no trading fee.
<p>
When you list an item for sale, you are recorded for rewards but not yet allowed. When your first item sells while you have items remaining listed, you become eligible to claim rewards. The rewards distribution is based on an unique claim clock that records 3 sets of times and the current set total eligible user count.  </p>
<p>
Anyone can call the function to set the claim clock, this sets the current time as "alpha", the previous "alpha" as "delta" and the previous "delta" as "omega" and also records the current total count for eligible users.
  </p>
 <p>
 Eligible users are alloted 3 claims per epoch cycle, until the next clock time is set which resets all claim amounts.
  These claims reduce in size the longer you wait, from 1/2 for the "delta" epoch to 1/3 for the "omega" epoch. If you wait until the "omega" epoch to claim all three allotments, then you will be given 1 full reward claims still.
  </p>
  <p>See the diagram here..</p>
 ![Rewards Diagram](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/PharOutRewardsControllerDiagram.png)
 
 </br>
 
 <p>
  There is a social media aspect of this that is built on top of a distributed cyber security database. You can create a profile using either your IP address, or your wallet address if you are signed in with web3. You can create a user profile, send personal messages to any crypto address, chat with the world and share pics/videos/gifs on a twitter like public forum, with more expansion to come including video chats, gaming server rooms and much more!
  </p>
<p>
  Here are a few screenshots from the current build. Mind you, I have built this myself and we still need to go through UX trials and suggested styling, so feel free to open comments on suggestions for styling or layouts on any of the screenshots. These are not exhaustive of all of the available components, but allows a brief introduction to the site.
  </p>
![image](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/FE%20Preview/Screen%20Shot%202022-02-26%20at%209.38.48%20PM.png)
![image](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/FE%20Preview/Screen%20Shot%202022-02-26%20at%209.40.10%20PM.png)
![image](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/FE%20Preview/Screen%20Shot%202022-02-26%20at%209.41.15%20PM.png)
![image](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/FE%20Preview/Screen%20Shot%202022-02-26%20at%209.42.54%20PM.png)
![image](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/FE%20Preview/Screen%20Shot%202022-02-26%20at%209.46.58%20PM.png)
  <h4>If interested in supporting...</h4>
  <p>Please consider donating to phunkyJON.eth or whalegoddessvault.eth for our work, or to pharoutdevs.eth for the dev multisig wallet.</p>
