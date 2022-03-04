// SPDX-License-Identifier: MIT  
//*~~~> TEST PHUNKS
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PhamToken is ERC20 {
    constructor(address _receiver) ERC20("PhamToken", "PHAMTKN") {
        _mint(_receiver, 21000000 * 10 ** decimals());
    }
}
