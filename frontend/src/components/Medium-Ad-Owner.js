import React from 'react'
import { handOverOwnership } from "../utils/interact";

const MediumAdOwner = () => (
  <div className="big-ad">
    <div className="adTitle">
      Medium Ad
    </div>
    <button className="renounceButton" onClick={handOverOwnership}>
     Renounce Ownership
    </button>
    <div className="adText">
      You are the owner of this Ad space
    </div>
  </div>
)

export default MediumAdOwner;