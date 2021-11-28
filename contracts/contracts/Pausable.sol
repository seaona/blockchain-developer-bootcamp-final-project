// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

/// @title An Ownable Contract
/// @author Mariona (seaona)
/// @notice Do not use this contract on production

contract Ownable {

    address private _owner;

    /// @dev Get current contract owner
    /// @return Address of current contract owner
    function getOwner() public view returns(address) {
        return _owner;
    }

    /// @dev Constructor that sets the _owner var to the creater of the contract 
    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /// @dev 'onlyOwner' modifier that throws if called by any account other than the owner.
    modifier onlyOwner {
        require(msg.sender == _owner, "You are not authorized to perform this action");
        _;
    }

    /// @dev Transfers ownership to a new address, only owner can call this function
    /// @param newOwner The address of the new owner
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    /// @dev Function for getting the contract owner
    /// @return Address with the current contract owner
    function getContractOwner() public view returns (address) {
        return _owner;
    }

    /// @dev Event that is throwed when contract ownership is transferred
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
}

/// @title A Pausable Contract
/// @author Mariona (seaona)
/// @notice Do not use this contract on production

contract Pausable is Ownable {

    bool private _paused;

    /// @dev Pause contract when it's running
    function pauseContract() public onlyOwner whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    /// @dev Resume contract when it' not paused
    function resumeContract() public onlyOwner whenNotPaused {
        _paused = false;
        emit ResumeContract(msg.sender);
    }

    /// @dev Constructor that sets the _paused variable to false
    constructor() {
        _paused = false;
    }
    
    /// @dev 'whenNotPaused' modifier that throws if contract is Paused.
    modifier whenNotPaused () {
        require(_paused == false, "Contract Paused!");
        _;
    }

    /// @dev 'whenNotPaused' modifier that throws if contract is Not Paused.
    modifier paused() {
        require(_paused == true, "Contract not Paused!");
        _;

    }

    /// @dev Function that returns if Contract is Paused
    /// @return Boolean saying if contract is Paused or not
    function isContractPaused() public view returns (bool) {
        return _paused;
    }

    /// @dev Paused event that emits the address that triggered the event
    /// @param account The address that triggered the event
    event Paused(address indexed account);

    /// @dev ResumeContract event that emits the address that triggered the event
    /// @param account The address that triggered the event
    event ResumeContract(address indexed account);
}