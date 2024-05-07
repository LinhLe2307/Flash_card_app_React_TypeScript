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
  sendRequest: SendRequestProps,
) => {
  try {
    const response = await sendRequest(`/api/cards/user/${userId}`,
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    return response.cards
  } catch(err) {
    console.log(err)
  }
}

const UserCards = () => {
  const userId = useParams().userId
  const [ dataFetched, setDataFetched ] = useState(false);
  const [ fetchCards, setFetchCards ] = useState<ObjectGenericProps<string>[]>([])
  const { error, sendRequest, clearError } = useHttpClient()
  const searchInput = useAppSelector(state => state.search.search_input)
  const { data, isLoading: isLoadingQuery } = useQuery({
    queryKey: ['cards'],
    queryFn: () => userId && getAllUserCards(userId, sendRequest),
    enabled: !dataFetched
  })

  // Check if data is being fetched for the first time
  if (isLoadingQuery && !dataFetched) {
    // Set dataFetched to true to disable further queries
    setDataFetched(true);
  }

  const cardDeleteHandler = (deletedCardId: string) => {
    const updatedState = [...fetchCards].filter(card => card.id !== deletedCardId)
    setFetchCards(updatedState)
  }

  useEffect(() => {
    const filter_list = searchInput.length !== 0
      ? data.filter((card: ObjectGenericProps<string>) => card.title.toLowerCase().indexOf(searchInput) !== -1)
      : data
    setFetchCards(filter_list)
  }, [searchInput, setFetchCards, data])
  
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

  return (
    <React.Fragment>
      { isLoadingQuery && <LoadingSpinner asOverlay/> }
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