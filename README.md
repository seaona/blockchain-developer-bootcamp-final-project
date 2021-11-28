# Manage Ads for your Website
## Summary
This project aims to become a tool for selling space on your website for advertisement purposes. Brands can buy Ad Space from your website.

**Goal**: the goal is to define a rotatory model for owning website space by advertisers.

1. The website owner generates an open position for onwing some space into their webstie, so an advertisor can add their ad.
2. This "space" (one or many) is minted as a new NFT and an auction is open permanently for owning that asset.
3. The owner of the Ad Area can then upload their ad and display it into the website space reserved for that ad, making the final payment to the owner of the website.

**Note**: Further tokenomics must be defined, like how often the ownership can be changed (i.e. days / months) until a new auction is open again

## Live Working Version
- A life working version can be found at the Github page.
- Deployed address and network can be found at the [txt file](deployed_address.txt).

## Project Patterns
[Design Patterns](design_pattern_decisions.md) and [Security Practices](avoiding_common_attacks.md) used in this project, for avoiding common attacks can be found on the corresponding files.

## Local Build
### Pre Requisites
1. Download or clone the repo
2. Setup environment: create .env file (copy .env.safe) and include your Infura, mnemonic and EtherScan API

### Smart Contracts
1. Go to `contacts` folder:

```cd contracts```

2. Compile contracts:

```truffle compile```

3. Migrate contracts on the desired network:

```
(truffle) migrate --reset --network develop
(truffle) migrate --reset --network rinkeby
(truffle) migrate --reset --network mainnet
(truffle) migrate --reset --network bsctestnet
(truffle) migrate --reset --network bsc
```
4. Run Smart Contract Unit Tests:

```truffle compile```

### Frontend
1. Go to `frontend` folder:

```cd frontend```

2. Install the required dependencies

```npm i```

3. Run the frontend client:

## Dependencies Used and Credits
**Smart Contracts**:
- Truffle as development environment for compiling, depoying and testing the smart contracts
- Networks configured: Rinkeby, Develop, Binancechain, Binancetestnet and Develop
- Etherscan API is used for contract verification

**Frontend**: 
- React
- Starter Setup based on [Alchemy's NFT Minter tutorial](https://docs.alchemyapi.io/alchemy/tutorials/nft-minter) for frontend design
- Metamask provider


## Site Note
Ethereum Account for Certification: 0x0297196d753045df822C67d23F9aB10c7128b102