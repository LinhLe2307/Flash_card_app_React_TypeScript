import { useQuery } from "@tanstack/react-query"
import CardList from "../components/CardList"
import { useParams } from 'react-router-dom'
import cardApi from "../../shared/api/cardApi"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import axios from "axios"
import axiosClient from "../../shared/api/axiosClient"

const DUMMY_PLACES = [
  {
    id: 'p1',
    term: 'kissa',
    definition: 'cat',
    imageUrl: 'https://images.unsplash.com/photo-1662715555387-cd3311fab6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lzc2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    creator: 'u1'
  }, 
  {
    id: 'p2',
    term: 'koira',
    definition: 'dog',
    imageUrl: 'https://images.unsplash.com/photo-1601727104149-3fd7e50ec590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29pcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    creator: 'u2'
  }, 
]
 
const getAllUserCards = async(userId: string) => {
  try {
    const response = await cardApi.getUserCards(userId)
    console.log(response)
    return response.cards
  } catch(err) {
    console.log(err)
  }
}

const UserCards = () => {
  const userId = useParams().userId
  const {data, isLoading, error} = useQuery({
    queryKey: ["cards"],
    queryFn: () => getAllUserCards(userId),
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