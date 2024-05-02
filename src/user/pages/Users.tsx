import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { SendRequestProps } from '../../shared/types/formTypes'

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient()   
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(sendRequest),
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {data && <UsersList items={data}/>}
    </React.Fragment>
  )
}

export default Users