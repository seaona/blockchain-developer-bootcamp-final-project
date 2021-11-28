# Solidity Pitfalls and Attacks
Design patterns used in this project:
- **Using Specific Compiler Pragma**: this project is using pragma solidity compiler version 0.8.0
- **Outdated Compiler Version [SWC-102]**: this project is using one of the latest compiler versions
- **Proper Use of Require, Assert and Revert**: this project make use of requires in several places, for example, for checking a buyer of an Ad area has enough funds for buying it.
- **Use Modifiers Only for Validation**: in this project, modifiers are used for validate correct users (Access control), as well as for checking the status of the contract (Operational/Not Operational), or if msg.valu is enough for a payment. Therefore, modifiers are only used for validations.
- **Integer Overflow and Underflow [SWC-101]**: this project uses SafeMath.sol for Addition and Substraction operations on the Ad Area uint.