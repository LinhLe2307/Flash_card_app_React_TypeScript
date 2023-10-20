import { useQuery } from '@tanstack/react-query'
import React from 'react'
import userApi from '../../shared/api/userApi'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from "../components/UsersList"

const getAllUsers = async() => {
  try {
    return await userApi.getAll()
  } catch(err) {
    console.log(err)
  }
}

const Users = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers
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
      {data && <UsersList items={data.users}/>}
    </React.Fragment>
  )
}

export default Users