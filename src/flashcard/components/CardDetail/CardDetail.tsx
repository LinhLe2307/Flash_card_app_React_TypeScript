import React, { SetStateAction, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { filterName } from '../../../shared/constants/global';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { ObjectGenericProps, SendRequestProps } from '../../../shared/types/sharedTypes';
import CardItemDetail from '../CardItemDetail/CardItemDetail';
import './CardDetail.css';

const getCardDetail = async(cardId: string, 
  sendRequest:SendRequestProps, 
  setCardDetail: React.Dispatch<SetStateAction<ObjectGenericProps<string | ObjectGenericProps<string>>>>
) => {
  try {
    const response = await sendRequest(`/api/cards/${cardId}`, 
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    const newLocation:ObjectGenericProps<ObjectGenericProps<string>> = {}
    Object.entries(response.card).filter(([key, value]) => filterName.indexOf(key) === -1 && (newLocation[key]=value as ObjectGenericProps<string>))
    
    setCardDetail(response.card)
    return newLocation
  } catch(err) {
    console.log(err)
  }
}

const CardDetail = () => {
    const { cardId } = useParams()
    const [ cardDetail, setCardDetail ] = useState<ObjectGenericProps<string | ObjectGenericProps<string>>>({}) 
    const { isLoading, error, sendRequest, clearError } = useHttpClient()   

    if (!cardId) {
      return <h2>Cannot find card</h2>
    }

    const {data} = useQuery({
      queryKey: ["card-detail"],
      queryFn: () => getCardDetail(cardId, sendRequest, setCardDetail),
      refetchOnWindowFocus: false
    }
    )

    // const loading = <div className="loading">Loading flashcard content...</div>;
    
    // navigation in cards
    const [current, setCurrent] = useState(0);
    function previousCard() {
      setCurrent(current - 1);
    }
    function nextCard() {
      setCurrent(current + 1);
    }

    const cards = data && Object.entries(data).map(([key, value]) => {
      return <CardItemDetail card={value} key={key} />;
    });
    
    // if(!data) {
    //   return <h2>Cannot fetching data</h2>
    // }
  
  return (
    <div className='card-detail-container'>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay/>}

      <h2>{ cardDetail.title as string }</h2>
      {/* number of cards */}
      {data && Object.keys(data) && Object.keys(data).length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {Object.keys(data).length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {data && cards && Object.keys(data) && Object.keys(data).length > 0 ? 
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
          {data && current < Object.keys(data).length - 1 ? (
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
        <p>{cardDetail.description as string}</p>
      </div>

      {
        typeof cardDetail.creator === 'object' 
        &&
        <div className='card-detail-user'>
          <img src={cardDetail.creator.image}/>
          <div>
            <div className='card-detail-user__created-by'>Created by</div>
            <h4>{`${cardDetail.creator.firstName} ${cardDetail.creator.lastName}`}
            </h4>
            <p className='card-detail-user__email'>@{cardDetail.creator.email}</p>
          </div>
        </div>
      }

    </div>
  );
}

export default CardDetail