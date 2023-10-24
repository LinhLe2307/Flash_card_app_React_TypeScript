import { useQuery } from '@tanstack/react-query'
import React from 'react'
import userApi from '../../shared/api/userApi'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from "../components/UsersList"

const getAllUsers = async() => {
  try {
    const response = await userApi.getAll()
    return response.users
  } catch(err) {
    console.log(err)
  }
}

const Users = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <LoadingSpinner asOverlay/>
  }

  if (error) {
    return <ErrorModal 
      error={"Cannot load users"} 
      onClear={() => !error}
    />
  }
  return (
    <React.Fragment>
      {data && <UsersList items={data}/>}
    </React.Fragment>
  )
}

export default Users