import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { filterName } from '../../../shared/constants/global';
import CardItemDetail from '../CardItemDetail/CardItemDetail';
import { GET_CARD_BY_ID } from '../../../shared/util/queries'
import { ObjectGenericProps } from '../../../shared/types/sharedTypes'
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

    const cardData = data && data.getCardById
    const cardDetail = cardData && Object.entries(cardData)
    .filter(([key, ]) => filterName.indexOf(key) === -1)
    
    // navigation in cards
    const [current, setCurrent] = useState(0);
    function previousCard() {
      setCurrent(current - 1);
    }
    function nextCard() {
      setCurrent(current + 1);
    }

    const cards = cardDetail && cardDetail.map(([key, value]: [key: string, value: ObjectGenericProps<string>]) => {
        return <CardItemDetail card={value} key={key} />;
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
  
  if(!cardDetail) {
    return <h2>Cannot fetching data</h2>
  }

  if (loading) return <LoadingSpinner asOverlay/>
  
  return (
    <div className='card-detail-container'>

      {
        errorMessage &&
          <ErrorModal error={errorMessage} onClear={clearError} />
      }

      <h2>{ cardData.title as string }</h2>
      {/* number of cards */}
      {cardDetail && cardDetail.length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {cardDetail.length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {cardDetail && cards && cardDetail.length > 0 ? 
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
          {cardDetail && current < cardDetail.length - 1 ? (
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
        <p>{cardData.description as string}</p>
      </div>

      {
        typeof cardData.creator === 'object' 
        &&
        <div className='card-detail-user'>
          <img src={cardData.creator.image}/>
          <div>
            <div className='card-detail-user__created-by'>Created by</div>
            <h4>{`${cardData.creator.firstName} ${cardData.creator.lastName}`}
            </h4>
            <p className='card-detail-user__email'>@{cardData.creator.email}</p>
          </div>
        </div>
      }

    </div>
  );
}

export default CardDetail