pragma solidity 0.8.12;

interface IRoleProvider {
  function hasTheRole(bytes32 role, address _address) external returns(bool);
  function fetchAddress(bytes32 _var) external returns(address);

  function hasContractRole(address _address) external view returns(bool);
  
}