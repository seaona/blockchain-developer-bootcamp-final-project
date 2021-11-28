//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AdsManager {

    // Using SafeMath to protect from overflows
    using SafeMath for uint256;
    
    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // Contract Ownership and Contract State
    address public owner;
    bool public operational = true;

    // Ads Management
    mapping (uint => Ad) ads;
    enum State { ForSale, Sold }
    enum Size { Big, Medium, Small }
    uint256 totalAdArea = 100;

    struct Ad {
        uint32 id;
        State state;
        Size size;
        string brand;
        address payable owner;
        uint256 price;
    }

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/
    event OwnershipTransferred(address _newOwner);
    event OwnershipRenounced();
    event UpdatedContractStatus();
    event AdAreaForSale(uint32 _adId);
    event AdAreaBought(uint32 _adId);
    event AdAreaIncreased(uint256 _adArea);
    event AdAreaDecreased(uint256 _adArea);


    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this Contract");
        _;
    }
    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _;
    }

    modifier onlyAdOwner(uint32 _adId) {
        require(msg.sender == ads[_adId].owner, "You are not the owner of this Ad Area");
        _;
    }

    modifier paidEnough(uint _adId) { 
    require(msg.value >= ads[_adId].price); 
    _;
    }

    /********************************************************************************************/
    /*                                     UTILITY FUNCTIONS                                    */
    /********************************************************************************************/
    // Ownership Management
        // Transfer Ownership to a new address (only Owner can perform this action)
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
        emit OwnershipTransferred(newOwner);
    }

        // Renounce Ownership and leave contract without Owner (onlyOwner functions won't be accessible anymore)
    function renounceOwnership() public onlyOwner {
        owner = address(0);
        emit OwnershipRenounced();
    }

    function isOperational() public view returns(bool) {
        return operational;
    }

    function setOperatingStatus(bool mode) external onlyOwner {
        operational = mode;      
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/
    constructor() {
        owner = msg.sender;
    }

    function increaseAdArea(uint256 increasingArea) public onlyOwner returns (uint256) {
        totalAdArea = totalAdArea + increasingArea;

        emit AdAreaIncreased(totalAdArea);
        return totalAdArea;
    }

    function decreaseAdArea(uint256 decreasingArea) public onlyOwner returns (uint256) {
        totalAdArea = totalAdArea - decreasingArea;
        
        emit AdAreaDecreased(totalAdArea);
        return totalAdArea;
    }

    function getTotalAdArea() public returns(uint256) {
        return totalAdArea;
    }
    
    function buyAdArea(uint32 _adId) public payable paidEnough(_adId) {
        uint256 amountToRefund = msg.value - ads[_adId].price;
        ads[_adId].owner = payable(msg.sender);
        ads[_adId].owner.transfer(amountToRefund);
        emit AdAreaBought(_adId);
    }

    function setForSaleAdArea(uint32 _adId) public onlyAdOwner(_adId) {
        ads[_adId].state = State.ForSale;
        emit AdAreaForSale(_adId);
    }



}
