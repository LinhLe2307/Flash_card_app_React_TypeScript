import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { ObjectGenericProps } from '../../../shared/types/sharedTypes';
import { GET_CARD_BY_ID } from '../../../shared/util/queries';
import CardItemDetail from '../CardItemDetail/CardItemDetail';
import './CardDetail.css';

const CardDetail = () => {
    const { cardId } = useParams() 

    if (!cardId) {
      return <h2>Cannot find card</h2>
    }

    const { data, loading, error, refetch } = useQuery(GET_CARD_BY_ID, {
      variables: { cardId },
      skip: !cardId 
    })
    
    const [errorMessage, setError] = useState(error?.message)
    
    const cardCreator = data && data.getCardById.creator[0]
    const cardData = data && data.getCardById.subcards

    // navigation in cards
    const [current, setCurrent] = useState(0);
    function previousCard() {
      setCurrent(current - 1);
    }
    function nextCard() {
      setCurrent(current + 1);
    }

    const cards = cardData && cardData.map((subcard: (ObjectGenericProps<string>)) => {
        return <CardItemDetail card={subcard} key={subcard.id} />;
    });

    const clearError = () => {
      setError(undefined);
  } ;
    
  
  // Use useEffect to refetch when cardId changes
  useEffect(() => {
    if (cardId) {
      refetch({ cardId });
    }
  }, [cardId, refetch]);

  if (loading) return <LoadingSpinner asOverlay/>
  
  return (
    <div className='card-detail-container'>

      {
        errorMessage &&
          <ErrorModal error={errorMessage} onClear={clearError} />
      }

      <h2>{ data.getCardById && data.getCardById.title as string }</h2>
      {/* number of cards */}
      {cardData && cardData.length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {cardData.length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {cardData && cards && cardData.length > 0 ? 
      <div>
        {cards[current]}
        {/* render nav buttons */}
        <div className="nav">
          {current > 0 ? (
            <button onClick={previousCard}>Previous card</button>
          ) : (
            <button className="disabled" disabled>
              Previous card
            </button>
          )}
          { cardData && current < cardData.length - 1 ? (
            <button onClick={nextCard}>Next card</button>
          ) : (
            <button className="disabled" disabled>
              Next card
            </button>
          )}
          {/* /render nav buttons */}
        </div>
      </div>
      : <LoadingSpinner asOverlay/>}
      {/* /render cards */}

      <div className='card-detail-description'>
        <h3>Description</h3>
        <p>{data.getCardById && data.getCardById.description as string}</p>
      </div>
      
      <div className='card-item__tags'>
        {
          data.getCardById && 
          data.getCardById.tags.map((tag: ObjectGenericProps<string>) => <span
              key={tag.id}
              className='card-item__tag'
            >{tag.name}</span>)
        }
      </div>

      {
        typeof cardCreator === 'object' 
        && cardCreator
        &&
        <div className='card-detail-user'>
          <img src={cardCreator.image}/>
          <div>
            <div className='card-detail-user__created-by'>Created by</div>
            <h4>{`${cardCreator.firstName} ${cardCreator.lastName}`}
            </h4>
            <p className='card-detail-user__email'>@{cardCreator.email}</p>
          </div>
        </div>
      }

    </div>
  );
}

export default CardDetail