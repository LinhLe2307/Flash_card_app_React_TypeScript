import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth-hook";
import Button from '../FormElements/Button';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useAuth()

  const handleClick = () => {
    navigate('/auth')
  }
  return (
    <>
      <div className='homepage'>
        <div className='homepage__container'>
          <div className='homepage__intro'>
            <h2>
              Welcome to CardIO!
            </h2>
            <p>
              Give your memory a good workout! Create your own
              flashcards and make learning simpler and more enjoyable!
            </p>
            
            {
              !token && 
              <Button type='button' onClick={handleClick}>Sign Up Now</Button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage