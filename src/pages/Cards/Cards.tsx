import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from "react"
import { useLocation, useParams } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppSelector } from '../../app/hooks'
import { ObjectGenericProps } from "../../types/sharedTypes"
// import CardItem from '../components/CardItem/CardItem'
import { SINGLE_USER } from "../../queries/queries"
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CardItem from '../Flashcard/CardItem';


const Cards = () => {
    const { userId } = useParams()
    const tagParam = useLocation().state?.tag ?? ''
    const searchInput = useAppSelector(state => state.search.search_input)
    const [ fetchCards, setFetchCards ] = useState<ObjectGenericProps<string | ObjectGenericProps<string>>[]>([])
    const [tag, setTag] = useState(tagParam)
  
    const { data, loading, error, refetch } = useQuery(SINGLE_USER, {
      variables: { userId }
    })
    const userCards = data?.getUserDetail?.cards
    const [errorMessage, setError] = useState(error?.message);
  
    const cardDeleteHandler = (deletedCardId: string) => {
      setFetchCards(prevState => prevState.filter(card => card.id !== deletedCardId))
      setTimeout(() => {
        refetch({userId})
      }, 500)
    }
  
    const clearError = () => {
      setError(undefined);
    };
  
    const clearTags = () => {
      setTag('')
    }
  
    useEffect(() => {
      setTag(tagParam)
    }, [tagParam])
  
    useEffect(() => {
      refetch({userId})
    }, [refetch, userId])
  
    useEffect(() => {
      if (userCards) {
        const tags_list = tag ? userCards
        .filter((card: ObjectGenericProps<string | ObjectGenericProps<string> >) => Array.isArray(card.tags) 
          && card?.tags?.find(tagName => tagName.name === tag) !== undefined)
        : userCards
  
        const filter_list = searchInput.length !== 0 ? tags_list
        .filter((card: ObjectGenericProps<string>) => card.title.toLowerCase().indexOf(searchInput) !== -1)
        : tags_list
        setFetchCards(filter_list)
      }
    }, [searchInput, data, tag])

    console.log(data)

    return (
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="My Cards" />

        {
          data && typeof userId === 'string' 
          && Array.isArray(fetchCards) && fetchCards.map(card => <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-strokedark dark:bg-boxdark">
              <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card?.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card?.description}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
            </div>)
          }

      </div>
    )
}

export default Cards