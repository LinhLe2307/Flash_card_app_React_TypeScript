import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from "react"
import { useLocation, useParams } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppSelector } from '../../app/hooks'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { ObjectGenericProps } from '../../shared/types/sharedTypes'
import CardItem from '../components/CardItem/CardItem'
import { GET_CARDS_BY_USER_ID } from '../../shared/util/queries'

import './UserCards.css'

const UserCards = ({ userIdProps }: { userIdProps?: string }) => {
  const userId = typeof userIdProps === 'string' && userIdProps ? userIdProps : useParams().userId
  const tagParam = useLocation().state?.tag ?? ''
  const searchInput = useAppSelector(state => state.search.search_input)
  const [ fetchCards, setFetchCards ] = useState<ObjectGenericProps<string | ObjectGenericProps<string>>[]>([])
  const [tag, setTag] = useState(tagParam)

  const { data, loading, error, refetch } = useQuery(GET_CARDS_BY_USER_ID, {
    variables: { userId }
  })
  const userCards = data?.getCardsByUserId?.cards

  const [errorMessage, setError] = useState(error?.message);

  const cardDeleteHandler = (deletedCardId: string) => {
    const updatedState = [...fetchCards].filter(card => card.id !== deletedCardId)
    setFetchCards(updatedState)
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
    if (userCards && tag) {
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

  if (errorMessage) {
    return <ErrorModal
      error={errorMessage} 
      onClear={clearError}
    />
  }

  if (loading) return <LoadingSpinner asOverlay/>
  return (
    <React.Fragment>
      <ul className='card-list'>
        {
          data && fetchCards &&
          <p className="search-results-count">About {data && fetchCards.length} {data && fetchCards.length >= 2 ? 'results' : 'result'}</p>
          }
          {
            tag && <div className='card-tags'>
              <h2>{tag} <span onClick={clearTags}><CancelIcon /></span></h2>
              {/* <Button>Reset Tag</Button> */}
            </div>
          }

        {
          data && Array.isArray(fetchCards) && fetchCards.map(card => <CardItem 
            key={card.id as string} 
            id={card.id as string}
            card={card}
            creator={typeof card.creator !== 'string' ? card.creator.id : ''}
            onDelete={cardDeleteHandler}
            userId={userId}
          />)
        }

    </ul>
    </React.Fragment>
  )
}

export default UserCards