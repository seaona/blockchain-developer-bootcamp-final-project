import React from 'react'
import { useState, useEffect } from 'react';
import { buyAdArea, handOverOwnership, getAdOwnership, getAdStatus } from "../utils/interact";

const onBuySmallAd = async () => {
  const { status } = await buyAdArea(2, 100);
  return status;
};

const SmallAd = () => {
  const [owner, setOwner] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
     async function getOwner() {
         const owner = await getAdOwnership(2);
         setOwner(owner);
     }
     getOwner();

     async function getStatus() {
      const status = await getAdStatus(2);
      setStatus(status)
    }
    getStatus()
  }, [])
  return(
  <div className="small-ad">
    <div className="adTitle">
        Small Ad
    </div>
    <div className="adText">
      The owner of this Ad space is {owner}
    </div>

    <div className="bigStatus2">Status: {status}</div>
    <button className="buyButton2" onClick={onBuySmallAd}>
        Buy Space
    </button>
    <div className="adText">
        This Ad space costs 100 wei
    </div>

    <button className="renounceButton2" onClick={() => handOverOwnership(2)}>
     Renounce Ownership
    </button>
  </div>
  )
}

export default SmallAd;