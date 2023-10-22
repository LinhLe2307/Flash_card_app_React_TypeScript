import { useState } from 'react'

import { ObjectGenericProps } from '../../shared/types/sharedTypes'
import './CardDetail.css'

const CardItemDetail = ({card, id}: {card: ObjectGenericProps<string>,id: string }) => {
    const [side, setSide] = useState(false);

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