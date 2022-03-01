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
 <li> MarketRoleProvider.sol: https://rinkeby.etherscan.io/address/0x20523731975A1633eA928650a7BC974AFEa32739#code </li>
  <li> OwnerProxy.sol: https://rinkeby.etherscan.io/address/0x2ee8EA56AE8f16977330d4537232CF8d6F053f38#code </li>
  <li> NFTMarket.sol: https://rinkeby.etherscan.io/address/0x2451E02AEAa8F142f9A8D54A872CE0B74CA9D7Bf#code </li>
  <li> MarketMint.sol: https://rinkeby.etherscan.io/address/0x15c132F02a7B7210c521C9E715BaB9E9a92381F4#code </li>
  <li> (used for testing ERC20 interaction) PhamToken:  https://rinkeby.etherscan.io/address/0x384c377e94E8afEa7f2e41b45919D8607d937771#code </li>
  <li> PhamNFTs.sol: https://rinkeby.etherscan.io/token/0x6d4Be00F4968D563492f6F279e1800AC8540eA92#code </li>
  <li> MarketBids.sol: https://rinkeby.etherscan.io/address/0x9Acd8b15AB4e623b994a602834019D2395aD90f8#code </li>
  <li> MarketCollections.sol: https://rinkeby.etherscan.io/address/0x9F20de40AA680E9cE4C8E13F6A4ba27eBe9b3244#code </li>
  <li> MarketOffers.sol: https://rinkeby.etherscan.io/address/0x1d475895C5cea8C8959EA3ABd2c7965D7d08298b#code </li>
  <li> MarketTrades.sol: https://rinkeby.etherscan.io/address/0x0CB404f8D4fD4f114902b8E0e352770A96990aA9#code </li>
  <li> MarketRewards.sol: https://rinkeby.etherscan.io/address/0xBDbd9D5825bECA96F1416aF0b2Ede7CcC498FE9B#code </li>
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
