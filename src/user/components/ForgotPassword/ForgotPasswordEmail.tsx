import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../../shared/components/FormElements/Button';
import { FORGOT_PASSWORD } from '../../../shared/util/queries';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { ObjectGenericProps } from '../../../shared/types/sharedTypes';
import Modal from '../../../shared/components/UIElements/Modal';
import FormBase from '../FormBase/FormBase';
import Email from '../../../shared/components/FormElements/Email';

const ForgotPasswordEmail = () => {
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [ showConfirmModal, setShowConfirmModal ] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const {
        register,
        handleSubmit
    } = useForm()
    
    const [singleUser, { loading, error }] = useMutation(FORGOT_PASSWORD)

    const handleSubmitEmail:SubmitHandler<ObjectGenericProps<string>> = async( data ) => {
        try {
            const response = await singleUser({
                variables: {
                    email: data.email
                }
            })

            if (response) {
                setShowConfirmModal(true)
            } else {
                setShowConfirmModal(false)
                setShowErrorModal(true)
            }
        } catch (err) {
            setShowConfirmModal(false)
            setShowErrorModal(true)
        }
    }

    const closeModal = () => {
        setShowErrorModal(false)
    }

    const cancelConfirmHandler = () => {
        setShowConfirmModal(false)
    }

    useEffect(() => {
        if (error && error.message.length > 0) {
            setErrorMessage(error.message)
        }
    }, [error])

  return (
    <>
        {loading && <LoadingSpinner asOverlay/>}
        { showErrorModal && 
            <ErrorModal
                error={errorMessage}
                onClear={closeModal}
            />
        }

        <Modal
            show={showConfirmModal}
            onCancel={cancelConfirmHandler}
            header=''
            contentClass='card-item__modal-content'
            footerClass='place-item__modal-actions'
            footer={
                <React.Fragment>
                    <div className='group-buttons'>
                        <Button onClick={cancelConfirmHandler}>CONFIRM</Button>
                    </div>
                </React.Fragment>
            }
        >
            <p>Please check your email and reset your password!</p>
        </Modal>

        <FormBase
            title='Forgot Password'
        >
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={ handleSubmit(handleSubmitEmail) } className='space-y-6'>
                    <Email register={register}/>
                    <Button 
                        type='submit' 
                        default={true}
                    > 
                        Continue
                    </Button>
                </form>
            </div>
        </FormBase>
        
    </>
  )
}

export default ForgotPasswordEmail