require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contractABI = require('../contract-abi.json')
const contractAddress = "0xC50E2d682B582e634bbf0c9907645060655B0011";
const etherScanAPIKey = process.env.ETHERSCAN_API_KEY;
/********************************************************************************************/
/*                                 WALLET CONNECTION FUNCTIONS                              */
/********************************************************************************************/

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "Wallet connected.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "Wallet connected.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
};


/********************************************************************************************/
/*                                       OWNER FUNCTIONS                                    */
/********************************************************************************************/

export const resumeContract = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.resumeContract().encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}


export const pauseContract = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.pauseContract().encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}


export const transferOwnership = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.transferOwnership().encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}

export const addSmallAdvertisementSpace = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.addSmallAdvertisementSpace().encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}

export const addMediumAdvertisementSpace = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.addMediumAdvertisementSpace().encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}


export const addBigAdvertisementSpace = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.addBigAdvertisementSpace().encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}

export const revokeAdFromBrand = async(adId) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.revokeAdFromBrand(adId).encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}

/********************************************************************************************/
/*                                       BUYER FUNCTIONS                                    */
/********************************************************************************************/

export const buyAdArea = async(_id, value) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value:  (value).toString(16),
      'data': window.contract.methods.buyAdArea(_id).encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}

export const handOverOwnership = async(_id) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.handOverOwnership(_id).encodeABI()
  };

  //sign the transaction via Metamask
  try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
      });
  return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
  }
  } catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message
  }

  }
}

/********************************************************************************************/
/*                                       GETTER FUNCTIONS                                   */
/********************************************************************************************/
export const getNumberOfAds = async() => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  let numberAds = await window.contract.methods.getAdsCounter().call();
  console.log(numberAds)
  return numberAds;
}

export const getAdOwnership = async (id) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  let adOwner = await window.contract.methods.getAdOwner(id).call();
  console.log(adOwner)
  return adOwner;
}

export const getAdStatus = async (id) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  let adStatus = await window.contract.methods.getAdStatus(1).call();
  console.log(adStatus)
  return adStatus;
}

export const getAdSize = async (id) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  let adSize = await window.contract.methods.getAdSize(1).call();
  console.log(adSize)
  return adSize;
}

export const isAddressOwner = async (id) => {
  var adOwnership = await getAdOwnership(id);
  const addressArray = await window.ethereum.request({
    method: "eth_accounts",
  });

  var currentAddress = addressArray[0].toUpperCase();
  
  if(adOwnership.toUpperCase()==currentAddress.toUpperCase()) {
    return true

  } else {

    return false
  }

}