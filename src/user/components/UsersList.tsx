import './UsersList.css'
import { UserProps } from '../types/userTypes'
import UserItem from './UserItem'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'

import { ListResponse } from '../../shared/types/sharedTypes'

const UsersList = ({items}: ListResponse<UserProps>) => {
    if (items.length === 0) {
        return <div className='center'>
            <CardAvatar className=''>
                <h2>No users found</h2>
            </CardAvatar>
        </div>
    }


      
  return (
    <div className="container">
        <div className="row ng-scope">
        <div className="col-md-9 col-md-pull-3">
            <p className="search-results-count">About {items.length} results</p>
            <ul>
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
            {/* <div className="text-align-center">
                <ul className="pagination pagination-sm">
                    <li className="disabled"><a href="#">Prev</a>
                    </li>
                    <li className="active"><a href="#">1</a>
                    </li>
                    <li><a href="#">2</a>
                    </li>
                    <li><a href="#">3</a>
                    </li>
                    <li><a href="#">4</a>
                    </li>
                    <li><a href="#">5</a>
                    </li>
                    <li><a href="#">Next</a>
                    </li>
                </ul>
                </div> */}
            </div> 
        </div>
    </div>

  )
}

export default UsersList