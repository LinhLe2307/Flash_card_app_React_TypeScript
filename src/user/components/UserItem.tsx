import './UserItem.css'
import Avatar from '../../shared/components/UIElements/Avatar'
import { UserItemProps } from '../../shared/constants/type'
import { Link } from 'react-router-dom'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'

const UserItem = ({id, image, name, cardCount}: UserItemProps) => {
  return (
    <li className='user-item'>
      <CardAvatar className='user-item__content'>
            <Link to={`/${id}/cards`}>
              <div className='user-item__image'>
                  <Avatar image={image} alt={name}/>
              </div>
              <div className='user-item__info'>
                  <h2>{name}</h2>
                  <h3>{cardCount} {cardCount === 1 ? 'Flash Card' : 'Flash Cards'}</h3>
              </div>
            </Link>
      </CardAvatar>
    </li>
  )
}

export default UserItem