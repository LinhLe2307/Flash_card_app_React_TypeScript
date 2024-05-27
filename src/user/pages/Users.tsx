import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../../app/hooks'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList/UsersList'
import { ALL_USERS } from '../../shared/util/queries'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { ObjectGenericProps } from '../../shared/types/sharedTypes'

const Users = () => {
  const searchInput = useAppSelector(state => state.search.search_input)

  const { data, loading, error } = useQuery(ALL_USERS)
  const [usersList, setUsersList] = useState([])

  const [errorMessage, setError] = React.useState(error?.message)
  const clearError = () => {
    setError(undefined);
  };

  useEffect(() => {
    if (data) {
      const filterList = data.getUsers.filter((user: ObjectGenericProps<string>) => `${user.firstName} ${user.lastName}`.includes(searchInput))
      setUsersList(filterList)
    }
  }, [searchInput, data])

  if (loading) return <LoadingSpinner asOverlay/>

  return (
    <React.Fragment>
      {
        errorMessage &&
        <ErrorModal error={errorMessage} onClear={clearError}/>
      }
      {
        usersList && <UsersList items={usersList}/>
      }
    </React.Fragment>
  )
}

export default Users