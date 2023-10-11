import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import { ListResponse } from '../../shared/types/shared/sharedTypes'
import { CardProps } from '../types/cardTypes'
import CardItem from './CardItem'
import './CardList.css'

const CardList = ({ items }: ListResponse<CardProps>) => {
    if (items.length === 0) {
        return <div className='card-list center'>
            <CardAvatar>
                <h2>No card found. Maybe create one?</h2>
                <button>Share Card</button>
            </CardAvatar>
        </div>
    }
  return (
    <ul className='card-list'>
        {items.map(card => <CardItem 
            key={card.id} 
            id={card.id}
            image={card.imageUrl}
            term={card.term}
            definition={card.definition}
            creatorId={card.creator}
        />)}
    </ul>
  )
}

export default CardList