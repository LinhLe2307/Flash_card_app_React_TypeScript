import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import { useParams } from 'react-router-dom'
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { SendRequestProps } from "../../shared/types/formTypes"
import { ObjectGenericProps } from "../../shared/types/sharedTypes"
import CardList from "../components/CardList"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"

 
const getAllUserCards = async (userId: string, setFetchCards: React.Dispatch<React.SetStateAction<ObjectGenericProps<string>[]>>, sendRequest:SendRequestProps) => {
  try {
    const response = await sendRequest(`/api/cards/user/${userId}`,
      'GET',
      null,
      {}
    )
    setFetchCards(response.cards)
    return response.cards
  } catch(err) {
    console.log(err)
  }
}

const UserCards = () => {
  const userId = useParams().userId
  const [fetchCards, setFetchCards] = useState<ObjectGenericProps<string>[]>([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { data } = useQuery({
    queryKey: ["cards"],
    queryFn: () => userId && getAllUserCards(userId, setFetchCards, sendRequest),
    // staleTime: Infinity
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

  return (
    <React.Fragment>
      { isLoading && <LoadingSpinner asOverlay/> }
      <CardList items={fetchCards} onDeleteCard={cardDeleteHandler}/>
    </React.Fragment>
  )
}

export default UserCards