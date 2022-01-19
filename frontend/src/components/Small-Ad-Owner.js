import React from 'react'
import { handOverOwnership } from "../utils/interact";


const SmallAdOwner = () => (
  <div className="big-ad">
    <div className="adTitle">
      Small Ad
    </div>
    <button className="renounceButton" onClick={handOverOwnership}>
     Renounce Ownership
    </button>
    <div className="adText">
      You are the owner of this Ad space
    </div>
  </div>
)

export default SmallAdOwner;