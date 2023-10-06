import { Form } from 'react-bootstrap'

interface FormTitleProps {
  title: string,
  type: string
}

const FormTitle = ({title, type}:FormTitleProps) => {
  return (
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>{title}</Form.Label>
        <Form.Control type={type} placeholder="name@example.com" />
      </Form.Group>
  )
}

export default FormTitle