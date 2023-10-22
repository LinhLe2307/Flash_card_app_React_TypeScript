import React, { useState } from 'react'
import Button from '../../shared/components/FormElements/Button'

import './CardDetail.css'

const CardItemDetail = ({card, id}) => {
  console.log("card",card)
    const [side, setSide] = useState();

    function handleClick() {
        console.log("clicked!");
        setSide(!side);
        console.log(side);
      }
  return (
    <div>
         <div className={`card-detail ${side ? "side" : ""}`} onClick={handleClick}>
        <small>
            <span>Card ID</span>
            {id}
        </small>
        {/* {side ? card.fields.side1 : card.fields.side2} */}
        <div className="front">{card.term}</div>
        <div className="back">{card.definition}</div>
        </div>
    </div>
  )
}

export default CardItemDetail