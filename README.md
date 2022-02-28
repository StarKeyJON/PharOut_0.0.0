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
 <li> RoleProvider.sol: https://rinkeby.etherscan.io/address/0xa451cCC7215487e51adDB0d35b4d1e8244c93745 </li>
  <li> OwnerProxy.sol: https://rinkeby.etherscan.io/address/0xC4d45096055c5Dcf085A54ca3976F78C0279F3cC </li>
  <li> NFTMarket.sol: https://rinkeby.etherscan.io/address/0x5F1C51E6551cF13e6BeB2bA5926583dCCCe47ea3 </li>
  <li> MarketMint.sol: https://rinkeby.etherscan.io/address/0xCe4505818630E1AD7A055D65ee9Fc671A1E7471c </li>
  <li> (used for testing ERC20 interaction) PhamToken:  https://rinkeby.etherscan.io/0x72F93cB3f352a6d2C7dd5E615c6FC4D49f8b466F </li>
  <li> PhamNFTs.sol: https://rinkeby.etherscan.io/token/0x1733320e58ca0720FbEA1f64F50e728c5Ca0a947 </li>
  <li> MarketBids.sol: https://rinkeby.etherscan.io/address/0x7880687c63E847Ff996bb8277bf7AB3661f3380D </li>
  <li> MarketCollections.sol: https://rinkeby.etherscan.io/address/0x83879063d8FA2d45FC9fB2620C2169ea45b2c1b2 </li>
  <li> MarketOffers.sol: https://rinkeby.etherscan.io/address/0x7353674c6608F11d10114D3aAb28A27a147E7398 </li>
  <li> MarketTrades.sol: https://rinkeby.etherscan.io/address/0xcCFbC0eF6A0522c26730913f493600780D8B35C3 </li>
  <li> MarketRewards.sol: https://rinkeby.etherscan.io/address/0xD1189973b9155006EeDE4ECcdE520C5048592C16 </li>
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
