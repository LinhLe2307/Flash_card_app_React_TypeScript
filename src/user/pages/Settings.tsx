import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import UserForm from '../components/UserForm/UserForm'
import { UserBaseProps } from '../types/userTypes'
import Button from '../../shared/components/FormElements/Button'
import '../components/UserForm/UserForm.css'
import Modal from '../../shared/components/UIElements/Modal'
import { SocialMediaType, UserInfoType } from '../../user/types/userTypes'
import { UPDATE_USER, SINGLE_USER, DELETE_USER } from '../../shared/util/queries'

const Settings = () => {
  const auth = useContext(AuthContext)
  const [ dataFetched, setDataFetched ] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const { loading, error, data } = useQuery(SINGLE_USER, {
    variables: { userId: auth && auth.userId }
  })

  const [errorMessage, setError] = useState(error?.message)

  const userDetail = data?.getUserDetail

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<UserBaseProps>({
    defaultValues: userDetail
  })

  const [ updateUser ] = useMutation(UPDATE_USER )
  const [ deleteUser ] = useMutation(DELETE_USER )

  const updateHandler:SubmitHandler<UserBaseProps> = async(dataForm) => {
    try {
      const body: any = {}
      // Get all values of the SocialMediaType enum
      const socialMediaValues = Object.values(SocialMediaType);

      // Get all values of the UserInfoProps enum
      const userInfoValues = Object.values(UserInfoType);

      [...socialMediaValues, ...userInfoValues].map(value => 
          body[value] = dataForm[value]
      )
      body['userId'] = auth.userId
      if (typeof dataForm['image'] === 'string') {
        body['image'] = {
          url: dataForm['image']
        }
      } else {
        body['image'] = {
          file: dataForm['image']
        }
      }
      await updateUser({ variables: body }) 
      
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
      const response = await deleteUser({
        variables: {
          userId: auth.userId
      }})
      if (response && response.data && response.data.deleteUser) {
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

  const clearError = () => {
    setError(undefined);
  };

  // Check if data is being fetched for the first time
  if (loading && !dataFetched) {
    // Set dataFetched to true to disable further queries
    setDataFetched(true);
  }

  useEffect(() => {
    reset(userDetail);
  }, [userDetail, reset, loading])

  return (
    <React.Fragment>
      {
        loading && <LoadingSpinner asOverlay/>
      }

      {
        errorMessage
        &&
        <ErrorModal error={errorMessage} onClear={clearError} />
      }
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
      {
        userDetail && 
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
            imageUrl={`${userDetail?.image}`}
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