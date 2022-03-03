pragma solidity 0.8.12;

interface IRewardsController {
  function createNftHodler(uint tokenId) external;
  function depositEthToDAO() payable external;
  function depositERC20Rewards(uint amount, address tokenAddress) external;
  function getFee() external view returns(uint);
  function setFee(uint _fee) external;
  function splitRewards(uint _split) external payable returns(bool);
  function createUser(address userAddress) external returns(bool);
  function setUser(bool canClaim, address userAddress) external returns(bool);
}
