import React from 'react'
import BigAd from "../components/Big-Ad"
import MediumAd from '../components/Medium-Ad'
import SmallAd from "../components/Small-Ad"
import { getNumberOfAds } from "../utils/interact"




const Advertisements = () => {
  
  return(
  <div className="Advertisement">
    <p>Number of Ads for Sale: </p>
    <BigAd />
    <MediumAd />
    <SmallAd />
  </div>
  )
  }

export default Advertisements