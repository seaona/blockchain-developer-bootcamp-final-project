//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AdsManager is Ownable {
    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // Contract Ownership and Contract State
    address public owner;
    bool private operational = true;

    // Ads Management
    mapping (uint => Ad) ads;
    enum State { ForSale, Sold, Deleted }
    enum Size { Big, Medium, Small }

    struct Ad {
        uint id;
        State state;
        Size size;
        string brand;
        address owner;
    }

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/



    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/
    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _; 
    }


    /********************************************************************************************/
    /*                                     UTILITY FUNCTIONS                                    */
    /********************************************************************************************/
    // Ownership Management
        // Transfer Ownership to a new address (only Owner can perform this action)
    function transferOwnership(address newOwner) onlyOwner;

        // Renounce Ownership and leave contract without Owner (onlyOwner functions won't be accessible anymore)
    function renounceOwnership() onlyOwner;
    
    function isOperational() public view returns(bool) {
        return operational;
    }

    function setOperatingStatus(bool mode) external onlyOwner {
        operational = mode;      
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/
    constructor() AdsManager() {
        owner = msg.sender;
    }

}
