import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { ObjectGenericProps, SendRequestProps } from "../../shared/types/sharedTypes"
import CardItem from "../components/CardItem/CardItem"
import CardFilter from "../components/CardFilter/CardFilter"

import "./UserCards.css"

const getAllUserCards = async (userId: string,
  sendRequest: SendRequestProps
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
  const tag = useParams().tag ?? ''
  const searchInput = useAppSelector(state => state.search.search_input)
  const [ dataFetched, setDataFetched ] = useState(false);
  const [ fetchCards, setFetchCards ] = useState<ObjectGenericProps<string>[]>([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { data, refetch } = useQuery({
    queryKey: ['cards'],
    queryFn: () => userId && getAllUserCards(userId, sendRequest),
    enabled: !dataFetched
  })

  // Check if data is being fetched for the first time
  if (isLoading && !dataFetched) {
    // Set dataFetched to true to disable further queries
    setDataFetched(true);
  }

  const cardDeleteHandler = (deletedCardId: string) => {
    const updatedState = [...fetchCards].filter(card => card.id !== deletedCardId)
    setFetchCards(updatedState)
  }

  useEffect(() => {
    if (data) {
      const tags_list = tag ? data
      .filter((card: ObjectGenericProps<string>) => card.tags.indexOf(tag) !== -1)
      : data

      const filter_list = searchInput.length !== 0 ? tags_list
      .filter((card: ObjectGenericProps<string>) => card.title.toLowerCase().indexOf(searchInput) !== -1)
      : tags_list
      setFetchCards(filter_list)
    }
  }, [searchInput, data, tag])
  
  useEffect(() => {
    refetch()
  }, [userId])
  
  if (error) {
    return <ErrorModal
      error={error} 
      onClear={clearError}
    />
  }

  return (
    <React.Fragment>
      { isLoading && <LoadingSpinner asOverlay/> }
      {/* {
        tag && <div>
          <h2>{tag}</h2>
          <Button>Reset Tag</Button>
        </div>
      } */}
      <CardFilter />
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
            userId={userId}
          />)
        }

        
    </ul>
    </React.Fragment>
  )
}

export default UserCards