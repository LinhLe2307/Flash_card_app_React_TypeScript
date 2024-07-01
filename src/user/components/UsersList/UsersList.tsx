import CardAvatar from '../../../shared/components/UIElements/CardAvatar';
import { UserProps } from '../../types/userTypes';
import UserItem from '../UserItem/UserItem';
import './UsersList.css';

import { ListResponse } from '../../../shared/types/sharedTypes';

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
        <p className='search-results-count'>About {items.length} {items.length >= 2 ? 'results' : 'result'}</p>
        <div className='search-result-row'>
            <ul>
            {
                items.length > 0 && items.map((user) => {
                    return <UserItem 
                        key={user.id as string} 
                        id={user.id as string}
                        image={user.image as string}
                        firstName={user.firstName as string}
                        lastName={user.lastName as string}
                        language={user.language as string}
                        country={user.country as string}
                        phone={user.phone as string}
                        email={user.email as string}
                        cardCount={user?.cards?.length}
                    />
                })
            }
            </ul> 
        </div>
    </div>

  )
}

export default UsersList