import Input from '../../shared/FormElements/Input'
import './NewCard.css'

const UserCard = () => {
  return (
    <form className='card-form'>
      <Input 
        type="text" 
        label="Title" 
        element="input"
        validators={[]}
        errorText="Please enter a valid title"
      />
    </form>
  )
}

export default UserCard