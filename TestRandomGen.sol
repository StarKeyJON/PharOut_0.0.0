//*~~~> SPDX-License-Identifier: MIT

pragma solidity  ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

 contract Random {
     
    uint public totalNfts;
    mapping(uint => bool) tokenIsClaimed;

    constructor(uint count) {
        totalNfts = count;
    }
    
    /// @notice
        //*~~~> For updating the total NFT supply
    ///@dev Can only be incremented!
        //*~~~> uint _amount: how many NFTs to add to the total count
    function setTotal(uint count) public returns(bool){
        uint newCount = totalNfts + count;
        require(newCount>totalNfts);
        totalNfts = newCount;
        return true;
    }

    ///@notice
        //*~~~> Send a number to receive a random tokenId not set in the list
    function getRandom(uint nonce) public returns(uint ramndomNumber){
        uint rambo = _rambo(nonce);
        bool checking = true;
        while(checking){
            if(_checkRandom(rambo)){
                checking = false;
            }
        }
        tokenIsClaimed[rambo] = true;
        return rambo;
    }

    function _rambo(uint randNonce) internal view returns(uint){
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % totalNfts;
        return(random);
    }

    function _checkRandom(uint number) internal returns(bool){
        if(tokenIsClaimed[number]){
            getRandom(number);
        } else if(number == 0){
            getRandom(number);
        }
        return true;
    }

 }
