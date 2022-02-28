# PharOut_0.0.0
<h3>
NFT Marketplace and social media platform
  </h3>

![Market Diagram](https://github.com/StarKeyJON/PharOut_0.0.0/blob/main/pharoutmarketdiagram.png)
<p>
A NFT marketplace that allows the trading of any NFT collection, purchasing of NFTs in ETH, bidding in ETH and offering ERC20's.
Place a "blind" bid, trade or ERC20 offer on any specific unlisted item or collection-wide(any NFT holder of that collection can claim).
  </p>
  <br/>
<h3>
  Current Rinkeby Contracts
  </h3>
<ul>
 <li> RoleProvider.sol: https://rinkeby.etherscan.io/address/0x5568371a94d3717411dcbd55ddd921e79d222f71 </li>
  <li> OwnerProxy.sol: https://rinkeby.etherscan.io/address/0x2cB4A2951ed52672671145F8a62214B6C27d63Da </li>
  <li> NFTMarket.sol: https://rinkeby.etherscan.io/address/0xeE4668d61A574c5D63fbF7e8431F7FE5E654dC99 </li>
  <li> MarketMint.sol: https://rinkeby.etherscan.io/address/0xE862d9fD08171080630E3D387c9511460636247E </li>
  <li> (used for testing ERC20 interaction) PhamToken:  https://rinkeby.etherscan.io/address/0x1895b2acf98827aE0a6c811256773126d1A3b24f </li>
  <li> PhamNFTs.sol: https://rinkeby.etherscan.io/token/0x413A577116942D012c531754fAd5c59e287D6C29 </li>
  <li> MarketBids.sol: https://rinkeby.etherscan.io/address/0x5165FC77a803f8488b6F944258f673dDD1Db0259 </li>
  <li> MarketCollections.sol: https://rinkeby.etherscan.io/address/0x82238081c13921f1E371928e96a9a357aDc72B9C </li>
  <li> MarketOffers.sol: https://rinkeby.etherscan.io/address/0x576A4959d0005df87F8D6ea72Fea53A29297066A </li>
  <li> MarketTrades.sol: https://rinkeby.etherscan.io/address/0x05cB531965EB757629D125Eaba2562C2e238cEDA </li>
  <li> MarketRewards.sol: https://rinkeby.etherscan.io/address/0x03A0BbA1Bf6c994CbC437DD41275D76463E6832d </li>
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
