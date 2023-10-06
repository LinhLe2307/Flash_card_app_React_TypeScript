import { Container } from 'react-bootstrap'
import FormInput from '../Form/FormInput'
import FormTextarea from '../Form/FormTextarea'
import FormImage from '../Form/FormImage'

const TermCard = () => {
  return (
    <Container>
        <FormInput title="Term" type="input" />
        <FormTextarea title="Definition"/>
        <FormImage />
    </Container>
  )
}

export default TermCard