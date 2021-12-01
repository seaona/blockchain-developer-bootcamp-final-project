import { useEffect, useState } from "react";
import { 
  connectWallet, 
  getCurrentWalletConnected, 
  resumeContract, 
  pauseContract,
  addSmallAdvertisementSpace,
  addMediumAdvertisementSpace,
  addBigAdvertisementSpace,
  revokeAdFromBrand,
  buyAdArea,
  smallAdEvent,
  getNumberOfAds
} from "./utils/interact";

import Ads from "./container/Ads";

const AdsManager = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    getNumberOfAds();

    addWalletListener(); 
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onResumePressed = async () => {
    const { status } = await resumeContract();
    setStatus(status);
  };

  const onPausePressed = async () => {
    const { status } = await pauseContract();
    setStatus(status);
  };

  const onAddSmallAdvertisementSpace = async () => {
    const { status } = await addSmallAdvertisementSpace();
    setStatus(status);
  };

  const onAddMediumAdvertisementSpace = async () => {
    const { status } = await addMediumAdvertisementSpace();
    setStatus(status);
  };

  const onAddBigAdvertisementSpace = async () => {
    const { status } = await addBigAdvertisementSpace();
    setStatus(status);
  };

  const getAds = async () => {
    const ad = await getNumberOfAds();
    return ad
  }
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Wallet connected.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  return (
    <div className="Container">  
      <div className="Blog">
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <br></br>
        <h1 id="title">Blogger Page XYZ</h1>
        <p>
          This is my professional blog. If you want to buy an Advertise space in this website just click on the Buy button
        </p>
        <div>
          <h2>🖼 Blog Entry 1</h2>
          <p className="black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper tristique magna, quis commodo metus suscipit sed. Mauris in neque ultricies, hendrerit nisi mattis, varius magna. Nulla ut risus nec magna facilisis fermentum vel et enim. Curabitur vitae egestas tortor, sit amet sollicitudin neque. Sed mattis magna a elit eleifend (...)</p>
          <h2>🤔 Blog Entry 2</h2>
          <p className="black">Sed quis dui nec metus tincidunt laoreet. Etiam nisi lacus, porttitor a congue vitae, tincidunt at augue. Nam dignissim nulla leo, posuere luctus sapien dictum ut. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eleifend a quam sed volutpat. Mauris ornare eleifend tortor, a sollicit (...) </p>
          <h2>✍️ Blog Entry 3</h2>
          <p className="black">Curabitur a lectus at lectus imperdiet ultricies. Aenean id nibh auctor, scelerisque odio efficitur, scelerisque dui. Integer et pharetra enim. Quisque nec placerat justo. Mauris tempus ante id est finibus, commodo sagittis leo faucibus. Fusce leo eros, aliquam a sodales ac, semper vel lacus. Mauris mattis consectetur nulla vitae luct (...)</p>
        </div>
        <button id="resumeButton" onClick={onResumePressed}>
          Resume Contract
        </button>
        <button id="pauseButton" onClick={onPausePressed}>
          Pause Contract
        </button>
        <button id="addSmallAdvertisementSpace" onClick={onAddSmallAdvertisementSpace}>
          Add Small Ad
        </button>
        <button id="addMediumAdvertisementSpace" onClick={onAddMediumAdvertisementSpace}>
          Add Medium Ad
        </button>
        <button id="addSmallAdvertisementSpace" onClick={onAddBigAdvertisementSpace}>
          Add Big Ad
        </button>
        <p id="status">
          {status}
        </p>
        </div>
      <Ads ads={getAds}/>
    </div>
  );
};

export default AdsManager;
