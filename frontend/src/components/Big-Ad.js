import React from 'react'
import { useState, useEffect } from 'react';
import { buyAdArea, handOverOwnership, getAdOwnership, getAdStatus } from "../utils/interact";

const onBuyBigAd = async () => {
  const { status } = await buyAdArea(0, 500);
  return status;
};

const BigAd = () => {
  const [owner, setOwner] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
     async function getOwner() {
         const owner = await getAdOwnership(0);
         setOwner(owner);
     }
     getOwner();

     async function getStatus() {
       const status = await getAdStatus(0);
       setStatus(status)
     }
     getStatus()
  }, [])
  return(
  <div className="big-ad">
    <div className="adTitle">
      Big Ad
    </div>
    <div className="adText">
      The owner of this Ad space is {owner}
    </div>

    <div className="bigStatus">Status: {status}</div>
    <button className="buyButton" onClick={onBuyBigAd}>
      Buy Space
    </button>
    <div className="adText">
      This Ad space costs 500 wei
    </div>
    
    <button className="renounceButton" onClick={() => handOverOwnership(0)}>
     Renounce Ownership
   </button>
  </div>
  )}


export default BigAd;