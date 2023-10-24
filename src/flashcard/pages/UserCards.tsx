import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from 'react-router-dom'
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { SendRequestProps } from "../../shared/types/formTypes"
import { ObjectGenericProps } from "../../shared/types/sharedTypes"
import CardList from "../components/CardList"

 
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
  })

  const cardDeleteHandler = (deletedCardId: string) => {
    const updatedState = [...fetchCards].filter(card => card.id !== deletedCardId)
    setFetchCards(updatedState)
  }
  
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  
  if (error) {
      return <ErrorModal
        error={"Cannot load the image"} 
        onClear={clearError}
      />
  }


  return (
    <CardList items={fetchCards} onDeleteCard={cardDeleteHandler}/>
  )
}

export default UserCards