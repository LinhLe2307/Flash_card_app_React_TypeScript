import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { SendRequestProps } from '../../shared/types/sharedTypes'
import UsersList from '../components/UsersList/UsersList'
import { UserProps } from '../types/userTypes'

const getAllUsers = async(sendRequest: SendRequestProps, searchInput: string) => {
  try {
    const response = await sendRequest(`/api/users`,
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    const result = 
      searchInput.length !== 0 
      ?  response.users.filter((user: UserProps) => 
      `${user.firstName} ${user.lastName}`.toLowerCase().indexOf(searchInput) !== -1)
      : response.users
    return result
  } catch(err) {
    console.log(err)
  }
}

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const searchInput = useAppSelector(state => state.search.search_input)

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(sendRequest, searchInput),
  })

  useEffect(() => {
    refetch();
  }, [searchInput, refetch])

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