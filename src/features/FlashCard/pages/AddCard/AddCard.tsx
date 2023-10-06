import { Form } from "react-bootstrap"
import { DEFAULT_CARDS } from "../../../../constants/global"
import TermCard from "../../components/TermCard"
import TitleCard from "../../components/TitleCard"

const AddCard = () => {
  return (
    <>
        <Form>
            <TitleCard />
            {
                DEFAULT_CARDS.map(card => <TermCard />)
            }
        </Form>
    </>
  )
}

export default AddCard