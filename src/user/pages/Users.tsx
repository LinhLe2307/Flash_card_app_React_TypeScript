// import { useQuery } from '@tanstack/react-query'
import { gql, useQuery } from '@apollo/client'
import React, {useState} from 'react'

import { useAppSelector } from '../../app/hooks'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList/UsersList'

const ALL_USERS = gql`
query findUserByName($searchInput: String) {
  users(searchInput: $searchInput) {
    id
    firstName
    lastName
    aboutMe
    country
    email
    phone
    language
    x
    linkedIn
    instagram
    github
    website
    image
    cards {
      id
      title
      description
      tags {
        name
      }
    }
  }
}
`

const Users = () => {
  const searchInput = useAppSelector(state => state.search.search_input)

  const data = useQuery(ALL_USERS, {
    variables: { searchInput }
  })

  console.log(data)

  if (data.loading) return <LoadingSpinner asOverlay/>

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )} */}
      {/* {filterList && <UsersList items={filterList}/>} */}
      {
        !data.loading && data.data && <UsersList items={data.data.users}/>
      }
    </React.Fragment>
  )
}

export default Users