import React from 'react'
import { buyAdArea, getNumberOfAds, getAdOwnership, getAdStatus, getAdSize, isAddressOwner } from "../utils/interact";

const onBuyBigAd = async () => {
  const { status } = await buyAdArea(0, 500);
  return status;
};

const BigAd = () => (
  <div className="big-ad">
    <div className="adTitle">
      Big Ad
    </div>
    <button className="buyButton" onClick={onBuyBigAd}>
      Buy Space
    </button>
    <div className="adText">
      This Ad space costs 500 wei
    </div>
  </div>
)

export default BigAd;