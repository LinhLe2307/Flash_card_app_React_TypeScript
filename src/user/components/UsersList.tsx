import './UsersList.css'
import { UserProps } from '../types/userTypes'
import UserItem from './UserItem'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'

import { ListResponse } from '../../shared/types/shared/sharedTypes'

const UsersList = ({items}: ListResponse<UserProps>) => {
    if (items.length === 0) {
        return <div className='center'>
            <CardAvatar className=''>
                <h2>No users found</h2>
            </CardAvatar>
        </div>
    }
  return (
    <ul className="users-list">
        {
            items.map((user) => {
                return <UserItem 
                    key={user.id} 
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    cardCount={user.cards}
                />
            })
        }
    </ul>
  )
}

export default UsersList