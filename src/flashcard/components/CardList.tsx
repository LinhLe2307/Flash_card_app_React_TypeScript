import Button from '../../shared/components/FormElements/Button'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import { CardListProps } from '../types/cardTypes'
import CardItem from './CardItem'
import './CardList.css'

const CardList = ({ items, onDeleteCard }: CardListProps) => {
    if (items.length === 0) {
        return <div className='card-list center'>
            <CardAvatar>
                <h2>No card found. Maybe create one?</h2>
                <Button to="/card/new">Share Card</Button>
            </CardAvatar>
        </div>
    }
  return (
    <ul className='card-list'>
        {items.map(card => <CardItem 
            key={card.id} 
            id={card.id}
            card={card}
            onDelete={onDeleteCard}
        />)}
        
    </ul>
  )
}

export default CardList