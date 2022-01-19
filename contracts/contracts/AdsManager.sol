// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./Pausable.sol";

/// @title Advertisement Manager Contract
/// @author Mariona (seaona)
/// @notice Do not use this contract on production
contract AdsManager is Pausable {
    /// @dev Using SafeMath to protect from overflow and underflow
    using SafeMath for uint256;
    
    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    /// @dev Advertisement variables
    mapping (uint => Ad) ads;
    uint256 public adsCounter;

    /// @dev Total Advertisement Area available is an abstract representation of the surface of the website available for Ads
    uint256 public totalAdAreaAvailable = 100;

    /// @dev Total Advertisement Taken is an abstract representation of the surface of the website dedicated to certains ad
    uint256 public totalAdAreaTaken = 0;

    /// @dev Total max area for advertisement cannot be updated as website space for advertisements is limited
    uint256 constant public totalAdMaxArea = 500;

    /// @dev Ads can be ForSale or Sold
    enum State { ForSale, Sold }

    /// @dev Big = 50 units of area, Medium = 25 units of area, Small = 10 units of area
    enum Size { Big, Medium, Small }

    /// @dev This is an Advertisement item
    struct Ad {
        State state;
        Size size;
        bytes32 brand;
        address payable owner;
        uint256 price;
    }

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/
    /// @dev Event that is emitted when Advertisement Area is put for sale
    event AdAreaForSale(uint32 _adId);

    /// @dev Event that is emitted when Advertisement Area is bought
    event AdAreaBought(uint32 _adId);

    /// @dev Event that is emitted when the owner of the website adds extra a Small Advertisement Area for sale
    event SmallAdAreaAdded(Size _size);

    /// @dev Event that is emitted when the owner of the website adds extra a Medium Advertisement Area for sale
    event MediumAdAreaAdded(Size _size);

    /// @dev Event that is emitted when the owner of the website adds extra a Big Advertisement Area for sale
    event BigAdAreaAdded(Size _size);


    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/
    /// @dev Modifier that throws if called by any account other than the Advertisement Owner
    modifier onlyAdOwner(uint32 _adId) {
        require(msg.sender == ads[_adId].owner, "You are not the owner of this Ad Area");
        _;
    }

    /// @dev Modifier that throws if not paid enough for the Ad 
    modifier paidEnough(uint _adId) { 
        require(msg.value >= ads[_adId].price, "You haven't paid enough for buying this Ad space"); 
        _;
    }

    /// @dev Modifier that throws if there is not enough Advertisement area available
    modifier enoughAdArea(uint _area) { 
        require(_area <= totalAdMaxArea, "There is not enough Advertisement area available"); 
        _;
    }

    /********************************************************************************************/
    /*                                         UTIL FUNCTIONS                                   */
    /********************************************************************************************/
    /// @dev Get the total number of Ads Areas
    /// @return Total Ads Areas
    function getAdsCounter() public view returns (uint256) {
        return adsCounter;
    }
    
    /// @dev Get the total Advertisement area for that website
    /// @return Total Advertisement Area
    function getTotalAdMaxArea() public view returns(uint256) {
        return totalAdMaxArea;
    }

    /// @dev Get the total Advertisement area taken for that website
    /// @return Total Advertisement Area taken by Brands
    function getTotalAdAreaTaken() public view returns(uint256) {
        return totalAdAreaAvailable;
    }

    /// @dev Get the total Advertisement area available for ads that website
    /// @return Total Advertisement Area available for Brands
    function getTotalAdAreaAvailable() public view returns(uint256) {
        return totalAdAreaTaken;
    }

    /// @dev Get Ad Owner
    /// @return Address of Ad Owner
    function getAdOwner(uint32 _id) public view returns(address) {
        return ads[_id].owner;
    }

    /// @dev Get Ad status
    /// @return enum status: ForSale or Sold
    function getAdStatus(uint32 _id) public view returns(State) {
        return ads[_id].state;
    }

    /// @dev Get Ad size
    /// @return enum size: Big, Medium, Small
    function getAdSize(uint32 _id) public view returns(Size) {
        return ads[_id].size;
    }
    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/
   
    /// @dev Website Owner Adds a Small Advertisement Area
    /// @return Total Advertisement Area available for Brands
    function addSmallAdvertisementSpace() public onlyOwner whenNotPaused returns (uint256) {
        require(totalAdAreaAvailable+totalAdAreaTaken+10 <= totalAdMaxArea, "Ads Area is already completed");

        ads[adsCounter].state = State.ForSale;
        ads[adsCounter].size = Size.Small;
        ads[adsCounter].brand = "For Sale";
        ads[adsCounter].owner = payable(msg.sender);
        ads[adsCounter].price = 100;

        adsCounter++;
        totalAdAreaTaken + 10;

        totalAdAreaAvailable = totalAdAreaAvailable + 10;

        emit SmallAdAreaAdded(Size.Small);
        return totalAdAreaAvailable;
    }

    /// @dev Website Owner Adds a Medium Advertisement Area
    /// @return Total Advertisement Area available for Brands
    function addMediumAdvertisementSpace() public onlyOwner whenNotPaused returns (uint256) {
        require(totalAdAreaAvailable+totalAdAreaTaken+25 <= totalAdMaxArea, "Ads Area is already completed");

        ads[adsCounter].state = State.ForSale;
        ads[adsCounter].size = Size.Medium;
        ads[adsCounter].brand = "For Sale";
        ads[adsCounter].owner = payable(msg.sender);
        ads[adsCounter].price = 250;

        adsCounter++;

        totalAdAreaTaken + 25;
        totalAdAreaAvailable = totalAdAreaAvailable + 25;

        emit MediumAdAreaAdded(Size.Medium);
        return totalAdAreaAvailable;
    }

    /// @dev Website Owner Adds a Big Advertisement Area
    /// @return Total Advertisement Area available for Brands
    function addBigAdvertisementSpace() public onlyOwner whenNotPaused returns (uint256) {
        require(totalAdAreaAvailable+totalAdAreaTaken+50 <= totalAdMaxArea, "Ads Area is already completed");

        ads[adsCounter].state = State.ForSale;
        ads[adsCounter].size = Size.Big;
        ads[adsCounter].brand = "For Sale";
        ads[adsCounter].owner = payable(msg.sender);
        ads[adsCounter].price = 500;

        adsCounter++;

        totalAdAreaTaken +50;
        totalAdAreaAvailable = totalAdAreaAvailable + 50;

        emit BigAdAreaAdded(Size.Big);
        return totalAdAreaAvailable;
    }

    /// @dev Revoke Ad from Brand
    function revokeAdFromBrand(uint32 _adId) public onlyOwner whenNotPaused returns (bool) {
        require(ads[_adId].state == State.Sold, "This Advertisement space is already available");

        uint256 adSize;

        if(ads[_adId].size==Size.Big) {
            adSize = 50;
        }
        if(ads[_adId].size==Size.Medium) {
            adSize = 25;
        }

        if(ads[_adId].size==Size.Small) {
            adSize = 10;
        }

        ads[_adId].state = State.ForSale;
        ads[_adId].owner = payable(msg.sender);
        ads[_adId].brand = "For Sale";

        totalAdAreaAvailable = totalAdAreaAvailable + adSize;
        return true;
    }

    /// @dev Brand buys Advertisement Area
    function buyAdArea(uint32 _adId) public payable paidEnough(_adId) whenNotPaused {
        require(ads[_adId].state == State.ForSale, "Ad Area is not for Sale");

        uint256 amountToRefund = msg.value - ads[_adId].price;
        ads[_adId].owner = payable(msg.sender);
        ads[_adId].owner.transfer(amountToRefund);
        ads[_adId].state = State.Sold;

        emit AdAreaBought(_adId);
    }

    /// @dev Give back Ad ownership to website owner
    function handOverOwnership(uint32 _adId) public whenNotPaused returns (bool) {
        require(ads[_adId].owner == msg.sender, "You are not the owner of this Ad");

        ads[_adId].state = State.ForSale;
        ads[_adId].owner = payable(0x0297196d753045df822C67d23F9aB10c7128b102);

        return true;
    }


}
