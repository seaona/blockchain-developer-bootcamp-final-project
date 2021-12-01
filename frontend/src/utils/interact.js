require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contractABI = require('../contract-abi.json')
const contractAddress = "0x545bD48dD06F53Ce58056f401F0F726451c95c60";
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

export const buyAdArea = async(_id, _brand) => {
  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.buyAdArea(_id, _brand).encodeABI()
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

export const smallAdEvent = async () => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const smallAdEvent = "0x0000000000000000000000000297196d753045df822c67d23f9ab10c7128b102"
  const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=3792247&toBlock=latest&address=${contractAddress}&topic1=${smallAdEvent}&apikey=${etherScanAPIKey}`)
  const data = await response.json();
  console.log(data)
}

export const mediumAdEvent = async () => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const mediumAdEvent = "0x12f661696b84d228d6f82cb29742d94632c4548ef7637cf65f071ab0f5df2424"
  const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=3792247&toBlock=latest&address=${contractAddress}&topic0=${mediumAdEvent}&apikey=${etherScanAPIKey}`)
  const data = await response.json();
  console.log(data)
}

export const bigAdEvent = async () => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const bigAdEvent = "0xa343efaece2ee7bc9af8e14caa3b2f0465744660fd6b761cd0e78ab0d4f41993"
  const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=3792247&toBlock=latest&address=${contractAddress}&topic0=${bigAdEvent}&apikey=${etherScanAPIKey}`)
  const data = await response.json();
  console.log(data)
}

export const adBought = async () => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const adBoughtEvent = "0x0000000000000000000000000297196d753045df822c67d23f9ab10c7128b102"
  const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=3792247&toBlock=latest&address=${contractAddress}&topic1=${adBoughtEvent}&apikey=${etherScanAPIKey}`)
  const data = await response.json();
  console.log(data)
}

export const getNumberOfAds = async () => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  
  await window.contract.methods.getAdsCounter().call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
      }
      console.log(`Number of ads: ${res}`)
      
      return JSON.stringify(res)
  });
}