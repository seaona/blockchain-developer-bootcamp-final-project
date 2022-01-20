import React from 'react'
import { useState, useEffect } from 'react';
import { buyAdArea, handOverOwnership, getAdOwnership, getAdStatus } from "../utils/interact";

const onBuyMediumAd = async () => {
  const { status } = await buyAdArea(1, 250);
  return status;
};

const MediumAd = () => {
  const [owner, setOwner] = useState(null);
  const [status, setStatus] = useState(null)
  useEffect(() => {
     async function getOwner() {
         const owner = await getAdOwnership(1);
         setOwner(owner);
     }
     getOwner();

     async function getStatus() {
      const status = await getAdStatus(1);
      setStatus(status)
    }
    getStatus()
  }, [])
  return(
  <div className="medium-ad">
    <div className="adTitle">
      Medium Ad
    </div>
    <div className="adText">
      The owner of this Ad space is {owner}
    </div>
    <div className="bigStatus1">Status: {status}</div>
    <button className="buyButton1"  onClick={onBuyMediumAd}>
        Buy Space
    </button>
    <div className="adText">
      This Ad space costs 250 wei
    </div>
    <button className="renounceButton1" onClick={() => handOverOwnership(1)}>
     Renounce Ownership
   </button>
  </div>
  )
}

export default MediumAd;