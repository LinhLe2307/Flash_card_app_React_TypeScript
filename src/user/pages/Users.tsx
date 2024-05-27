import { useQuery } from '@apollo/client'
import React from 'react'

import { useAppSelector } from '../../app/hooks'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList/UsersList'
import { ALL_USERS } from '../../shared/util/queries'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

const Users = () => {
  const searchInput = useAppSelector(state => state.search.search_input)

  const data = useQuery(ALL_USERS, {
    variables: { searchInput }
  })

  const [errorMessage, setError] = React.useState(data?.error?.message)
  const clearError = () => {
    setError(undefined);
  };

  if (data.loading) return <LoadingSpinner asOverlay/>

  return (
    <React.Fragment>
      {
        errorMessage &&
        <ErrorModal error={errorMessage} onClear={clearError}/>
      }
      {
        !data.loading && data.data && data.data.getUsers && <UsersList items={data.data.getUsers}/>
      }
    </React.Fragment>
  )
}

export default Users