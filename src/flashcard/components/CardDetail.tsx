import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import './CardDetail.css';
import CardItemDetail from './CardItemDetail';
import { ObjectGenericProps } from '../../shared/types/sharedTypes';

// const getCardDetail = () => {

// }

const CardDetail = () => {
    const [flashcarddata, setFlashcarddata] = useState({});
    const location = useLocation().state.card

  // https://www.debuggr.io/react-map-of-undefined/
  const cards = Object.entries(flashcarddata).map(([key, value]) => {
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
  
  
  useEffect(() => {
      const nameState = ["creator", "id", "description", "title", "__v", "_id"]
      const newLocation:ObjectGenericProps<ObjectGenericProps<string>> = {}
      Object.entries(location).filter(([key, value]) => nameState.indexOf(key) === -1 && (newLocation[key]=value as ObjectGenericProps<string>))
      setFlashcarddata(newLocation)
    }, [location])

    // if (Object.keys(flashcarddata).length !== 0) {
    //   return (
    //     <div>
    //       <div>The number of cards is: {Object.keys(flashcarddata).length}</div>
    //       {cards[0]}
    //     </div>
    //   );
    // } else {
    //   return <div>Loading...</div>;
    // } }
  return (
    <div>
      {/* number of cards */}
      {Object.keys(flashcarddata) && Object.keys(flashcarddata).length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {Object.keys(flashcarddata).length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {Object.keys(flashcarddata) && Object.keys(flashcarddata).length > 0 ? cards[current] : loading}
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
        {current < Object.keys(flashcarddata).length - 1 ? (
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