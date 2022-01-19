import React from 'react'
import { buyAdArea } from "../utils/interact";

const onBuyMediumAd = async () => {
  const { status } = await buyAdArea(1, 250);
  return status;
};

const MediumAd = () => (
  <div className="medium-ad">
    <div className="adTitle">
      Medium Ad
    </div>
    <button className="buyButton"  onClick={onBuyMediumAd}>
        Buy Space
    </button>
    <div className="adText">
      This Ad space costs 250 wei
    </div>
  </div>
)

export default MediumAd;