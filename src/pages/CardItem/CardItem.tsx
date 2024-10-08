import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import { ObjectGenericProps } from '../../types/sharedTypes';
import { GET_CARD_BY_ID } from "../../queries/queries"
import CardItemDetail from './CardItemDetail';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import './CardItem.css';

const CardItem = () => {
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

  if (loading) return <Loading />
  return (
    <div className="mx-auto max-w-270">
        <Breadcrumb pageName="My Cards" />
        <div className='card-detail-container'>
        <h2 className='text-black dark:text-white'>{ data?.getCardById && data.getCardById.title as string }</h2>
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
        : <Loading/>}
        {/* /render cards */}

        <div className='card-detail-description text-black dark:text-white'>
            <h3>Description</h3>
            <p>{data?.getCardById && data.getCardById.description as string}</p>
        </div>
        
        <div className='text-black dark:text-white mt-5'>
          {
            data?.getCardById && 
            data.getCardById.tags.map((tag: ObjectGenericProps<string>) => <span
                key={tag.id}
                className='px-3 py-2.5 border border-slate-300 rounded-3xl mr-2'
              >{tag.name}</span>)
          }
        </div>

        {
          typeof cardCreator === 'object' 
          && cardCreator
          &&
          <div className='card-detail-user dark:border-strokedark dark:bg-boxdark'>
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
    </div>
  );
}

export default CardItem