pragma solidity 0.8.12;

interface INFTMarket { 
    function transferNftForSale(address receiver, uint itemId) external returns(bool);
}
