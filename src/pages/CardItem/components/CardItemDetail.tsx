import React, { useState } from 'react';

import { ObjectGenericProps } from '../../../types/sharedTypes';

const CardItemDetail = ({card}: {card: ObjectGenericProps<string>}) => {
    const [side, setSide] = useState(false);

    function handleClick() {
        setSide(!side);
      }
  return (
    <div>
      <div className={`card-detail ${side ? 'side' : ''} dark:border-strokedark dark:bg-boxdark`} onClick={handleClick}>
        <div className='front text-black dark:text-white'>{card.term}</div>
        <div className={`back ${!card.imageUrl && 'back--center'}`}>
          <p className='text-black dark:text-white'>
            {card.definition}
          </p>

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