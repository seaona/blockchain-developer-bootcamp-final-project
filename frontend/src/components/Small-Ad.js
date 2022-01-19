import React from 'react'
import { buyAdArea } from "../utils/interact";

const onBuySmallAd = async () => {
  const { status } = await buyAdArea(2, 100);
  return status;
};

const SmallAd = () => (
  <div className="small-ad">
      <div className="adTitle">
        Small Ad
      </div>
      <button className="buyButton" onClick={onBuySmallAd}>
        Buy Space
      </button>
      <div className="adText">
        This Ad space costs 100 wei
      </div>
  </div>
)

export default SmallAd;