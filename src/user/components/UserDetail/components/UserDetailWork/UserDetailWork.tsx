import CardItem from "../../../../../flashcard/components/CardItem/CardItem"
import { ObjectGenericProps } from "../../../../../shared/types/sharedTypes"

interface UserDetailWorkProps {
    cards: ObjectGenericProps<string>[]
    userId: string
}

const UserDetailWork = ({ cards, userId }: UserDetailWorkProps) => {
    const cardDeleteHandler = () => {}
  return (
    <div style={{ listStyleType: "none", marginTop: "2.5rem" }}>
        {
            cards &&
            <p className="search-results-count">About {cards.length} results</p>
        }
        {
            cards && cards.map(card => <CardItem
                key={card.id}
                id={card.id}
                card={card}
                creator={card.creator}
                onDelete={cardDeleteHandler}
                userId={userId}
            />)
        }
    </div>
    
  )
}

export default UserDetailWork