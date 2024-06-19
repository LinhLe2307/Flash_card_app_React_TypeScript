import UserCards from "../../../../../flashcard/pages/UserCards"

const UserDetailWork = ({ userId }: { userId: string }) => {
  return (
    <div style={{ listStyleType: "none", marginTop: "2.5rem" }}>
        {/* {
            cards && cards.map(card => <CardItem
                key={card.id}
                id={card.id}
                card={card}
                creator={card.creator}
                onDelete={cardDeleteHandler}
                userId={userId}
            />)
        } */}
        {
            <UserCards userIdProps = {userId}/>
        }
    </div>
    
  )
}

export default UserDetailWork