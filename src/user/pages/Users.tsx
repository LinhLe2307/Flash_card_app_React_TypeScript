// import { useQuery } from '@tanstack/react-query'
import { useQuery } from '@apollo/client'
import React from 'react'

import { useAppSelector } from '../../app/hooks'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList/UsersList'
import { ALL_USERS } from '../../shared/util/queries'


const Users = () => {
  const searchInput = useAppSelector(state => state.search.search_input)

  const data = useQuery(ALL_USERS, {
    variables: { searchInput }
  })

  console.log(data)

  if (data.loading) return <LoadingSpinner asOverlay/>

  return (
    <React.Fragment>
      {/* <ErrorModal error={data.error} onClear={clearError}/> */}
      {/*  {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )} */}
      {
        !data.loading && data.data && data.data.getUsers && <UsersList items={data.data.getUsers}/>
      }
    </React.Fragment>
  )
}

export default Users