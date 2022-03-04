pragma solidity 0.8.7;

interface IRewardsController {
  function createNftHodler(uint tokenId) external returns (bool);
  function depositERC20Rewards(uint amount, address tokenAddress) external returns(bool);
  function getFee() external view returns(uint);
  function setFee(uint _fee) external returns (bool);
  function splitRewards(uint _split) external payable returns(bool);
  function createUser(address userAddress) external returns(bool);
  function setUser(bool canClaim, address userAddress) external returns(bool);
}
