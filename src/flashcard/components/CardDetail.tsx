import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { filterName } from '../../shared/constants/global';
import { ObjectGenericProps } from '../../shared/types/sharedTypes';
import './CardDetail.css';
import CardItemDetail from './CardItemDetail';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { SendRequestProps } from '../../shared/types/formTypes';

const getCardDetail = async(cardId: string, sendRequest:SendRequestProps) => {
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
    console.log(newLocation)
    return newLocation
  } catch(err) {
    console.log(err)
  }
}

const CardDetail = () => {
    const { cardId } = useParams()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()   

    if (!cardId) {
      return <h2>Cannot find card</h2>
    }

    const {data, isLoading: isLoadingFetch} = useQuery({
      queryKey: ["card-detail"],
      queryFn: () => getCardDetail(cardId, sendRequest),
      refetchOnWindowFocus: false
    }
    )

    
    const loading = <div className="loading">Loading flashcard content...</div>;
    
    // navigation in cards
    const [current, setCurrent] = useState(0);
    function previousCard() {
      setCurrent(current - 1);
    }
    function nextCard() {
      setCurrent(current + 1);
    }
    // https://www.debuggr.io/react-map-of-undefined/
    const cards = data && Object.entries(data).map(([key, value]) => {
      return <CardItemDetail card={value} id={key} key={key} />;
    });
    
    if(!data) {
      return <h2>Cannot fetching data</h2>
    }
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoadingFetch && <LoadingSpinner asOverlay/>}
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
      {data && cards && Object.keys(data) && Object.keys(data).length > 0 ? cards[current] : loading}
      {/* /render cards */}

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
    </React.Fragment>
  );
}

export default CardDetail