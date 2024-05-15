import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import UserForm from '../../shared/components/FormElements/UserForm'
import { UserBaseProps } from '../types/userTypes'
import Button from '../../shared/components/FormElements/Button'
import { SendRequestProps } from '../../shared/types/sharedTypes'
import '../../shared/components/FormElements/UserForm.css'
import Modal from '../../shared/components/UIElements/Modal'
import { SocialMediaType, UserInfoType } from '../../user/types/userTypes'


const getSingleUser = async(sendRequest: SendRequestProps, userId: string) => {
  try {
    const response = await sendRequest(`/api/users/${userId}`,
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    return response.user
  } catch(err) {
    console.log(err)
  }
}

const Settings = () => {
  const auth = useContext(AuthContext)
  const [ dataFetched, setDataFetched ] = useState(false);
  const { isLoading, error, sendRequest, clearError} = useHttpClient()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const {data, isLoading: isLoadingQuery} = useQuery({
    queryKey: ['single-user'],
    queryFn: () => typeof auth.userId === 'string' && getSingleUser(sendRequest, auth.userId),
    enabled: !dataFetched
  })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors }
  } = useForm<UserBaseProps>({
    defaultValues: data
  })

  const [submittedData, setSubmittedData] = useState({})

  const updateHandler:SubmitHandler<UserBaseProps> = async(dataForm) => {
    try {
      const formData = new FormData() 
      // Get all values of the SocialMediaType enum
      const socialMediaValues = Object.values(SocialMediaType);

      // Get all values of the UserInfoProps enum
      const userInfoValues = Object.values(UserInfoType);

      [...socialMediaValues, ...userInfoValues, 'password', 'image'].map(value => 
          formData.append(value, dataForm[value] as File)
      )

      const response = await sendRequest(`/api/users/${auth.userId}`,
          'PATCH',
          formData,
          {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth.token
          }
      )
      if (response) {
        setSubmittedData(response.user)
      }
      
    } catch(err) {
        console.log(err)
    }
  }

  const openDeleteHandle = () => {
    setShowDeleteModal(true)
  }

  const cancelDeleteHandle = () => {
    setShowDeleteModal(false)
  }
  const openCancelHandler = () => {
    setShowCancelModal(true)
  }

  const cancelModelHandle = () => {
    setShowCancelModal(false)
  }

  const openConfirmHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelConfirmHandle = () => {
    setShowConfirmModal(false)
  }

  const deleteAccountHandler = async() => {
    try {
      const response = await sendRequest(`/api/users/${auth.userId}`,
          'DELETE',
          null,
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          }
      )
      if (response) {
        auth.logout()
      }
    } catch(err) {
      console.log(err)
    }
  }

  const cancelChangesHandler = () => {
    reset()
    setShowCancelModal(false)
  }

  // Check if data is being fetched for the first time
  if (isLoadingQuery && !dataFetched) {
    // Set dataFetched to true to disable further queries
    setDataFetched(true);
  }

  useEffect(() => {
    reset(data)
  }, [isLoading])

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(submittedData)
    }
  }, [formState, submittedData, reset])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal 
            show={showCancelModal} 
            onCancel={cancelModelHandle}
            header='Cancel changes'
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={
              <>
                <Button type='button' onClick={cancelChangesHandler}>CONFIRM</Button>
                <Button inverse type='button' onClick={cancelModelHandle}>CLOSE</Button>
              </>
            }
        >
            <div className='map-container'>
               Are you sure you want to cancel changes?
            </div>
        </Modal>
      <Modal 
            show={showDeleteModal} 
            onCancel={cancelDeleteHandle}
            header='Confirm delete'
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={
              <>
                <Button type='button' onClick={deleteAccountHandler}>CONFIRM</Button>
                <Button inverse type='button' onClick={cancelDeleteHandle}>CLOSE</Button>
              </>
            }
        >
            <div className='map-container'>
               Are you sure you want to delete this profile?
            </div>
        </Modal>
      { isLoadingQuery && <LoadingSpinner asOverlay/> }
      {
        data && 
        <form onSubmit={handleSubmit(updateHandler)}>
          <Modal 
            show={showConfirmModal} 
            onCancel={cancelConfirmHandle}
            header='Confirm changes'
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={
              <>
                <Button type='submit' onClick={cancelConfirmHandle}>CONFIRM</Button>
                <Button inverse type='button' onClick={cancelConfirmHandle}>CLOSE</Button>
              </>
            }
          >
              <div className='map-container'>
                Are you sure you want to update profile?
              </div>
          </Modal>
          <UserForm 
            register={register}
            setValue={setValue}
            errors={errors}
            imageUrl={`${data.image}`}
            title='Account Settings'
            disabled={true}
          > 
            <div className='py-3 pb-4 border-bottom'>
              <Button type='button' onClick={openConfirmHandler}>
                Save Changes
              </Button>
              <Button type='button' inverse onClick={openCancelHandler}>
                Cancel
              </Button>
            </div>
            <div 
              className='d-sm-flex align-items-center pt-3' id='delete'>
                <div>
                    <b>Delete your account</b>
                </div>
                <div >
                    <Button danger type='button' onClick={openDeleteHandle}>Delete</Button>
                </div>
            </div>
          </UserForm>
        </form>
      }
    </React.Fragment>
  )
}

export default Settings