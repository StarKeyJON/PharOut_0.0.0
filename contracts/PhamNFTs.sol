pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PhamNFTs is ERC721, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    bytes32 public constant USER_OWNER_ROLE = keccak256("USER_OWNER");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 tokenId;
    uint256 price;
    uint256 supply;
    string baseUri;

    constructor(address userOwnerAddress, address controllerAddress, address minterAddress, string memory _baseUri, uint _supply) ERC721("pharOutNfts", "PHAROUT") {
      _grantRole(DEFAULT_ADMIN_ROLE, controllerAddress);
      _grantRole(USER_OWNER_ROLE, userOwnerAddress);
      _grantRole(MINTER_ROLE, minterAddress);
      baseUri = _baseUri;
      supply = _supply;
    }

    function safeMint(address to) public payable onlyRole(MINTER_ROLE)  {
      tokenId = _tokenIdCounter.current();
      require(supply >= tokenId, "Not enough left");
      _safeMint(to, tokenId);
      _tokenIdCounter.increment();
    }
    
    /*~~~> 
      For setting the total supply of NFTs as more artwork comes in from the community;
      Can only be increased;
    <~~~*/
    function setSupply(uint totalAmount) public onlyRole(USER_OWNER_ROLE) returns(bool){
      require(totalAmount >= _tokenIdCounter.current());
      supply = totalAmount;
      return true;
    }
    
    function setBaseUri(string memory _baseUri) public onlyRole(USER_OWNER_ROLE) {
        baseUri = _baseUri;
    }
    
    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseUri, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() public onlyRole(USER_OWNER_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, AccessControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
