import { Form } from 'react-bootstrap'

const FormImage = () => {
  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Image</Form.Label>
      <Form.Control type="file" />
    </Form.Group>

  )
}

export default FormImage