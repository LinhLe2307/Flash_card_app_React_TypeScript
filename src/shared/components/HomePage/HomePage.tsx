import React from 'react';
import { useNavigate } from "react-router-dom";
import Users from '../../../user/pages/Users'
import Button from '../FormElements/Button'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth')
  }
  return (
    <>
      <div className='homepage'>
        <div className='homepage__container'>
          <div className='homepage__intro'>
            <h2>
              Experience a new era of AI-enhanced learning
            </h2>
            <p>CardIO is more than flashcards: it’s the #1 global learning platform. 
              Join our community of 300 million learners using CardIO’s practice tests, 
              Expert Solutions and AI-powered tools to improve their grades and reach their goals.
            </p>
            <Button type='button' onClick={handleClick}>Sign Up Now</Button>
          </div>
        </div>
      </div>
      <Users />
    </>
  )
}

export default HomePage