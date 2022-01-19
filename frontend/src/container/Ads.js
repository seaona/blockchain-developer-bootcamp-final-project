import React from 'react'
import BigAd from "../components/Big-Ad"
import BigAdOwner from "../components/Big-Ad-Owner"
import MediumAd from '../components/Medium-Ad'
import MediumAdOwner from '../components/Medium-Ad-Owner'
import SmallAd from "../components/Small-Ad"
import SmallAdOwner from "../components/Small-Ad-Owner"
import { getNumberOfAds } from "../utils/interact"
import { isAddressOwner } from "../utils/interact";


class Advertisements extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
    render() {
      
    // Conditional Rending of components depending on Ad ownership
    const renderBigAd = () => {
      if (this.props.owner0==0){return <BigAd />
        } else {
          return <BigAdOwner />
        }
    }

    const renderMediumAd = () => {
      if (this.props.owner1==0){return <MediumAd />
        } else {
          return <MediumAdOwner />
        }
    }

    const renderSmallAd = () => {
      if (this.props.owner2==0){return <SmallAd />
        } else {
          return <SmallAdOwner />
        }
    }
    
    return(
      <div className="Advertisement">
        <p>Number of Ads for Sale: </p>
        {renderBigAd()}
        {renderMediumAd()}
        {renderSmallAd()}
      </div>
    )
  }
}

export default Advertisements