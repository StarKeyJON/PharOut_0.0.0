/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("MarketPlace TempMint Contract Unit Test", function() {
  it("Should interact with the Redeem and Mint function in TempMint & PhamNFTs contracts.", async function() {
    before((done) => {
      setTimeout(done, 2000);
    });
    const [deployer] = await ethers.getSigners();
    console.log(deployer.address)

    const TempMint = await ethers.getContractFactory("TempMint");
    const mint = await TempMint.deploy(deployer.address);
    await mint.deployed();
    const mintAddress = mint.address;
    console.log("TempMint provider Address is: ", mintAddress);

    const NFT = await ethers.getContractFactory("PhamNFTs");
    const phamNft = await NFT.deploy(deployer.address, deployer.address, mintAddress,  "https://gateway.pinata.cloud/ipfs/QmZKAYAmDfm26bQREKi7qbSxhLb972v32j6YdpwoQtJ1uo/", 125);
    await phamNft.deployed()
    const phamNftContractAddress = phamNft.address;
    console.log("PhamNFTs Contract Address: "+ phamNftContractAddress)

    await mint.setNftAddress(phamNftContractAddress)
  
    console.log("All contracts are now deployed and operational!!")
    
    console.log("")
    console.log("|__________Mint Price____________|")
    await mint.fetchMintPrice().then(res=>{
        const wei = BigNumber.from(res);
        console.log("|              ",ethers.utils.formatEther(wei,"ether"),"             |")
    })
        console.log("")
  await mint.redeemForNft(16, [
      "0x2f67a952b952593848D597102298ACf9253b841b", 
      "0x686218c292b04f4d2F6e4737C9134d6f6D8fd687", 
      "0xFcDd460A15aAD5Bc32A7CeaBb0DF9cAb1Ac7dcE4", 
      "0x16f78c6a47360531a2366BAB4c05cA28BB3222BC",
      "0xEcf786d2E9DC6919B5c22d6ffE916Ae736c9EbB0",
      "0xC839de0fEd241607d50aa4107aE582443B906e4c",
      "0x7345c5ebC0A037812a5e90B72C33A6dEcBA9AF83",
      "0x1Cae0d50b9c7191A0769c9DB5BC8089256DCD017",
      "0x846D8680978314C801AaBC12ccb5D482F9c033c1",
      "0xA48a129DD0e2CC5ffd1759673E60Dfb925dF2690",
      "0x5252aAa5CD24cBc25e7f033f8Aee99c419bE8d8f",
      "0x8A595CfF2a07fD63CB06b101102a75fe4173F384",
      "0x117fc50b84b515efe3c82d8bbb2e1fa00751fea0",
      "0x1B3FEA07590E63Ce68Cb21951f3C133a35032473",
      "0xffad5d78dd52eb9538998472a22506bdea0632c3",
      "0x846D8680978314C801AaBC12ccb5D482F9c033c1"
    ])

    console.log("___________Internal Memory___________")
    await mint.fetchNFTsCreated().then(ack=>{
        ack.forEach(res=>{
            console.log({
                tokenId: res.tokenId.toNumber(),
                contractAddress: res.contractAddress,
                minter: res.minter
            })
        })
    })
    console.log("")
    console.log("___________Minter Memory___________")
    await mint.fetchNFTsCreatedByAddress("0xffad5d78dd52eb9538998472a22506bdea0632c3").then(ack=>{
        ack.forEach(res=>{
            console.log("0xffad5d78dd52eb9538998472a22506bdea0632c3 minted: ",{
                tokenId: res.tokenId.toNumber(),
                contractAddress: res.contractAddress,
                minter: res.minter
            })
        })
    })
    console.log("")
    console.log("| __________ Mint Price __________ |")
    /// Setting the mint price
    await mint.setMintPrice(ethers.utils.parseUnits(".1","ether"));
    await mint.fetchMintPrice().then(res=>{
        const wei = BigNumber.from(res);
        console.log("|              ",ethers.utils.formatEther(wei,"ether"),"               |")
    })
    console.log("|__________________________________|")
    console.log("")
  // DEV_ROLE: 0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2
  await mint.grantRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2", "0x8a595cff2a07fd63cb06b101102a75fe4173f384")
  await mint.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000", "0x8a595cff2a07fd63cb06b101102a75fe4173f384")
  console.log("  ___________   DEFAULT_ADMIN_ROLE & DEV_ROLE granted to pharoutdevs.eth    _____________ ")
  console.log("|                                                                                         |")
  console.log("| All NFTs minted and contract accessibility handed over to the pharoutdevs.eth multisig! |")
  console.log("| _______________________________________________________________________________________ |")
})})
