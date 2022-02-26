
pragma solidity ^0.8.7;

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

    constructor(address userOwnerAddress, address controllerAddress, address minterAddress, string memory _baseUri) ERC721("pharOutNfts", "PHAROUT") {
      _grantRole(DEFAULT_ADMIN_ROLE, controllerAddress);
      _grantRole(USER_OWNER_ROLE, userOwnerAddress);
      _grantRole(MINTER_ROLE, minterAddress);
      supply = 10000;
      baseUri = _baseUri;
    }

    function safeMint(address to) public payable onlyRole(MINTER_ROLE)  {
      uint256 tokenId = _tokenIdCounter.current();
      require(supply >= tokenId, "Not enough left");
      _tokenIdCounter.increment();
      _safeMint(to, tokenId);
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
