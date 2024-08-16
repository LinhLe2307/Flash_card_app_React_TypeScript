import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React from 'react';
import Input from '../../components/Forms/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../utils/validators';

// import Button from '../../shared/components/FormElements/Button';
import ImageUrl from '../../components/Forms/Image/ImageUrl';
import { TermFlashcardProps } from '../../types/cardTypes';
// import './TermFlashcard.css';


const TermFlashcard = ({cardId, inputHandler, removeSubCardHandler, flashcard, length}:TermFlashcardProps) => {

  return (
    <div className="bg-gray-50 p-4 mb-5.5 rounded-lg shadow">
      <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row border-b'>
        <div className='w-full sm:w-1/2 py-2 dark:border-strokedark dark:text-white'>{cardId}</div>
        {
          typeof length === 'number' && length >= 5 &&
          <div className="w-full sm:w-1/2 flex justify-end rounded py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
            <button 
              type='button' 
              onClick={() => removeSubCardHandler(cardId)}
            >
              <DeleteRoundedIcon />
            </button> 
          </div>
        }
      </div>
      <div className='flex flex-col gap-5.5 sm:flex-row'>
        {
          typeof flashcard !== 'string' && !flashcard
          && <>
            <div className='w-full sm:w-1/3'>
                <Input 
                  nameId='term'
                  id={`${cardId}`}
                  type='text' 
                  label='Term*' 
                  element='input'
                  validators={
                    [
                      VALIDATOR_REQUIRE()
                    ]
                  }
                  errorText='Please enter a valid term'
                  onInput = {inputHandler}
                />
              </div>
              <div className='w-full sm:w-1/3'>
                <Input 
                  nameId='definition'
                  id = {`${cardId}`}
                  type='text' 
                  label='Definition*' 
                  element='textarea'
                  validators={
                    [
                      VALIDATOR_REQUIRE()
                    ]
                  }
                  errorText='Please enter a valid definition.'
                  onInput = {inputHandler}
                />
            </div> 
          </>
          }
          {
            typeof flashcard !== 'string' 
            && !Array.isArray(flashcard)
            && flashcard
            &&
            <>
              <div className='w-full sm:w-1/3'>
                <Input 
                nameId='term'
                id={`${cardId}`}
                type='text' 
                label='Term*' 
                element='input'
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText='Please enter a valid term'
                onInput = {inputHandler}
                initialValue={flashcard.term.value}
                initialIsValid={true}
                />
                </div>
              <div className='w-full sm:w-1/3'>
              <Input 
                nameId='definition'
                id = {`${cardId}`}
                type='text' 
                label='Definition*' 
                element='textarea'
                validators={
                  [
                    VALIDATOR_REQUIRE()
                  ]
                }
                errorText={`Please enter a valid definition {'\n'}
                (at least 5 characters).`}
                onInput = {inputHandler}
                initialValue={flashcard?.definition?.value ?? ''}
                initialIsValid={true}
              />
            </div>
            </>
        }         
        <ImageUrl 
          flashcard={flashcard}
          cardId={cardId} 
          inputHandler={inputHandler}
          removeSubCardHandler={removeSubCardHandler}
          />
      </div>
    </div>
  )
}

export default TermFlashcard