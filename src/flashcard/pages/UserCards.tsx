import { useQuery } from "@tanstack/react-query"
import { useParams } from 'react-router-dom'
import cardApi from "../../shared/api/cardApi"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import CardList from "../components/CardList"
import { useState } from "react"
import { ObjectGenericProps } from "../../shared/types/sharedTypes"

 
const getAllUserCards = async(userId: string, setFetchCards: React.Dispatch<React.SetStateAction<ObjectGenericProps<string>[]>>) => {
  try {
    const response = await cardApi.getUserCards(userId)
    setFetchCards(response.cards)
    return response.cards
  } catch(err) {
    console.log(err)
  }
}

const UserCards = () => {
  const userId = useParams().userId
  const [fetchCards, setFetchCards] = useState<ObjectGenericProps<string>[]>([])

  const {data, isLoading, error} = useQuery({
    queryKey: ["cards"],
    queryFn: () => userId && getAllUserCards(userId, setFetchCards),
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
        onClear={() => !error}
      />
  }


  return (
    <CardList items={fetchCards} onDeleteCard={cardDeleteHandler}/>
  )
}

export default UserCards