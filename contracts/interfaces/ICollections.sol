pragma solidity 0.8.7;

interface ICollections {
  function isRestricted(address nftContract) external returns(bool);
  function isRestricted(address[] memory nftContracts) external returns(bool);
  function canOfferToken(address token) external returns (bool);
  function canOfferToken(address[] memory tokens) external returns (bool);
  function editMarketplaceContract( bool[] memory restricted, address[] memory nftContract) external returns (bool);

}
