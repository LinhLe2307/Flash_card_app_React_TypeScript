import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { SendRequestProps } from '../../shared/types/sharedTypes'
import UsersList from '../components/UsersList/UsersList'
import { UserProps } from '../types/userTypes'

const getAllUsers = async(sendRequest: SendRequestProps) => {
  try {
    const response = await sendRequest(`/api/users`,
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    return response.users
  } catch(err) {
    console.log(err)
  }
}

const Users = () => {
  const [ dataFetched, setDataFetched ] = useState(false);
  const { error, sendRequest, clearError } = useHttpClient()
  const searchInput = useAppSelector(state => state.search.search_input)
  
  const { data, isLoading: isLoadingQuery } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(sendRequest),
    enabled: !dataFetched
  })
  const [filterList, setFilterList] = useState([])

  // Check if data is being fetched for the first time
  if (isLoadingQuery && !dataFetched) {
    // Set dataFetched to true to disable further queries
    setDataFetched(true);
  }

  useEffect(() => {
    const result = 
      searchInput && searchInput.length !== 0 
      ?  data.filter((user: UserProps) => 
      `${user.firstName} ${user.lastName}`.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1)
      : data
    setFilterList(result)
  }, [searchInput, data])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoadingQuery && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {filterList && <UsersList items={filterList}/>}
    </React.Fragment>
  )
}

export default Users