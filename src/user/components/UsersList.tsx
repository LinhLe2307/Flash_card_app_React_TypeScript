import './UsersList.css'
import { UsersListProps } from '../../shared/constants/type'
import UserItem from './UserItem'


const UsersList = ({items}: UsersListProps) => {
    if (items.length === 0) {
        return <div className='center'>
            <h2>No users found</h2>
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