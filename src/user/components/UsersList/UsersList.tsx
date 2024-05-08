import React from 'react';

import './UsersList.css'
import { UserProps } from '../../types/userTypes'
import UserItem from '../UserItem/UserItem'
import CardAvatar from '../../../shared/components/UIElements/CardAvatar'

import { ListResponse } from '../../../shared/types/sharedTypes'

const UsersList = ({items}: ListResponse<UserProps>) => {
    if (items.length === 0) {
        return <div className='center'>
            <CardAvatar>
                <h2>No users found</h2>
            </CardAvatar>
        </div>
    }

  return (
    <div className='search-result-container'>
        <p className='search-results-count'>About {items.length >= 2 ? `${items.length} results` : `${items.length} result`}</p>
        <div className='search-result-row'>
            <ul>
            {
                items.map((user) => {
                    return <UserItem 
                        key={user.id} 
                        id={user.id}
                        image={user.image}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        language={user.language}
                        country={user.country}
                        phone={user.phone}
                        email={user.email}
                        cardCount={user.cards.length}
                    />
                })
            }
            </ul> 
        </div>
    </div>

  )
}

export default UsersList