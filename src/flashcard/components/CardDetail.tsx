import { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import './CardDetail.css';
import CardItemDetail from './CardItemDetail';
import { ObjectGenericProps } from '../../shared/types/sharedTypes';
import { useQuery } from '@tanstack/react-query';
import cardApi from '../../shared/api/cardApi';
import { filterName } from '../../shared/constants/global';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const getCardDetail = async(cardId) => {
  try {
    const response = await cardApi.getDetailCard(cardId)
    const newLocation:ObjectGenericProps<ObjectGenericProps<string>> = {}
    Object.entries(response.card).filter(([key, value]) => filterName.indexOf(key) === -1 && (newLocation[key]=value as ObjectGenericProps<string>))
    console.log(newLocation)
    return newLocation
  } catch(err) {
    console.log(err)
  }
}

const CardDetail = () => {
    // const [flashcarddata, setFlashcarddata] = useState({});
    const { cardId } = useParams()

    const {data, isLoading, error} = useQuery({
      queryKey: [],
      queryFn: () => getCardDetail(cardId),
      refetchOnWindowFocus: false
    }
    )

  // https://www.debuggr.io/react-map-of-undefined/
  const cards = data && Object.entries(data).map(([key, value]) => {
    return <CardItemDetail card={value} id={key} key={key} />;
  });

  const loading = <div className="loading">Loading flashcard content...</div>;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }
  
  
  // useEffect(() => {
  //     const filterName = ["creator", "id", "description", "title", "__v", "_id"]
  //     const newLocation:ObjectGenericProps<ObjectGenericProps<string>> = {}
  //     Object.entries(location).filter(([key, value]) => filterName.indexOf(key) === -1 && (newLocation[key]=value as ObjectGenericProps<string>))
  //     setdata(newLocation)
  //   }, [location])

    // if (Object.keys(data).length !== 0) {
    //   return (
    //     <div>
    //       <div>The number of cards is: {Object.keys(data).length}</div>
    //       {cards[0]}
    //     </div>
    //   );
    // } else {
    //   return <div>Loading...</div>;
    // } }

    if (isLoading) {
      return <LoadingSpinner asOverlay/>
    }
  
    if (error) {
      return <ErrorModal 
        error={"Cannot load users"} 
        onClear={() => !error}
      />
    }
  return (
    <div>
      {/* number of cards */}
      {Object.keys(data) && Object.keys(data).length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {Object.keys(data).length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {Object.keys(data) && Object.keys(data).length > 0 ? cards[current] : loading}
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
        {current < Object.keys(data).length - 1 ? (
          <button onClick={nextCard}>Next card</button>
        ) : (
          <button className="disabled" disabled>
            Next card
          </button>
        )}
        {/* /render nav buttons */}
      </div>
    </div>
  );
}

export default CardDetail