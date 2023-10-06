import { Form } from 'react-bootstrap'

interface FormTextareaProps {
    title: string
}

const FormTextarea = ({title}:FormTextareaProps) => {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{title}</Form.Label>
        <Form.Control as="textarea" rows={3} />
    </Form.Group>
  )
}

export default FormTextarea