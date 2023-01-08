//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VirtualEstate{
    address payable owner;
    address payable virtualEstateAccount = payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);

    mapping (address => uint) whichPlotTheyOwn;
    mapping (uint => address) whoOwnsThisPlot;

    constructor(){
        owner = payable(msg.sender);
    }

    function makePayment(uint plotIndex) payable public{
            virtualEstateAccount.transfer(msg.value);
            whichPlotTheyOwn[msg.sender] = plotIndex;
            whoOwnsThisPlot[plotIndex] = msg.sender;
    }

    function getBalance() public view returns(uint, uint){
            return (owner.balance, virtualEstateAccount.balance);
    }

    function flushOut() private{
        require(msg.sender == owner, "only owner can call this function");
        virtualEstateAccount.transfer(address(this).balance);
    }

}