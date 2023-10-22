import { useQuery } from "@tanstack/react-query"
import { useParams } from 'react-router-dom'
import cardApi from "../../shared/api/cardApi"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import CardList from "../components/CardList"

 
const getAllUserCards = async(userId: string) => {
  try {
    const response = await cardApi.getUserCards(userId)
    return response.cards
  } catch(err) {
    console.log(err)
  }
}

const UserCards = () => {
  const userId = useParams().userId
  const {data, isLoading, error} = useQuery({
    queryKey: ["cards"],
    queryFn: () => userId && getAllUserCards(userId),
  })
  
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
    <CardList items={data}/>
  )
}

export default UserCards