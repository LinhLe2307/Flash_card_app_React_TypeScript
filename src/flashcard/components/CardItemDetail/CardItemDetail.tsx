import { useState } from 'react';

import { ObjectGenericProps } from '../../../shared/types/sharedTypes';
import '../CardDetail/CardDetail.css';

const CardItemDetail = ({card}: {card: ObjectGenericProps<string>}) => {
    const [side, setSide] = useState(false);

    function handleClick() {
        setSide(!side);
      }
  return (
    <div>
         <div className={`card-detail ${side ? "side" : ""}`} onClick={handleClick}>
        <div className="front">{card.term}</div>
        <div className={`back ${!card.imageUrl && 'back--center'}`}>
          <div>
            {card.definition}
          </div>

          {
            card.imageUrl && 
            <img src={card.imageUrl} />
          }
        </div>
        </div>
    </div>
  )
}

export default CardItemDetail