import React from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList/UsersList'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useAppSelector } from '../../app/hooks' 

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const filterList = useAppSelector(state => state.search.filter_list)

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {filterList && <UsersList items={filterList}/>}
    </React.Fragment>
  )
}

export default Users