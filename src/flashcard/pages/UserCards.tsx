import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { SendRequestProps, ObjectGenericProps } from "../../shared/types/sharedTypes"
import CardItem from "../components/CardItem/CardItem"

import "./UserCards.css"

const getAllUserCards = async (userId: string, 
  setFetchCards: React.Dispatch<React.SetStateAction<ObjectGenericProps<string>[]>>, 
  sendRequest: SendRequestProps,
  searchInput: string
) => {
  try {
    const response = await sendRequest(`/api/cards/user/${userId}`,
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    const filter_list = searchInput.length !== 0
      ? response.cards.filter((card: ObjectGenericProps<string>) => card.title.toLowerCase().indexOf(searchInput) !== -1)
      : response.cards
    setFetchCards(filter_list)
    return filter_list
  } catch(err) {
    console.log(err)
  }
}

const UserCards = () => {
  const userId = useParams().userId
  const [ fetchCards, setFetchCards ] = useState<ObjectGenericProps<string>[]>([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const searchInput = useAppSelector(state => state.search.search_input)
  const { refetch } = useQuery({
    queryKey: ["cards"],
    queryFn: () => userId && getAllUserCards(userId, setFetchCards, sendRequest, searchInput),
  })

  const cardDeleteHandler = (deletedCardId: string) => {
    const updatedState = [...fetchCards].filter(card => card.id !== deletedCardId)
    setFetchCards(updatedState)
  }
  
  if (error) {
      return <ErrorModal
        error={error} 
        onClear={clearError}
      />
  }

  // if (items && items.length === 0) {
    //     return <div className='card-list center'>
    //         <CardAvatar>
    //             <h2>No card found. Maybe create one?</h2>
    //             <Button to="/card/new">Share Card</Button>
    //         </CardAvatar>
    //     </div>
    // }

    useEffect(() => {
      refetch();
    }, [userId, refetch, searchInput]);

  return (
    <React.Fragment>
      { isLoading && <LoadingSpinner asOverlay/> }
      <ul className='card-list'>
        {
            fetchCards &&
            <p className="search-results-count">About {fetchCards.length} results</p>
        }

        {
          fetchCards && fetchCards.map(card => <CardItem 
            key={card.id} 
            id={card.id}
            card={card}
            creator={card.creator}
            onDelete={cardDeleteHandler}
          />)
        }

        
    </ul>
    </React.Fragment>
  )
}

export default UserCards