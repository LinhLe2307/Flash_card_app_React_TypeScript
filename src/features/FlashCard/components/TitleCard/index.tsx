import { Container } from 'react-bootstrap'
import FormTitle from '../Form/FormInput'
import FormTextarea from '../Form/FormTextarea'

const TitleCard = () => {
  return (
    <Container>
        <FormTitle title="Title" type="input" />
        <FormTextarea title="Description"/>
    </Container>
  )
}

export default TitleCard