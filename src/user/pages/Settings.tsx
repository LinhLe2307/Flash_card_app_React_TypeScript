import { useQuery } from "@tanstack/react-query"
import React, { useContext, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import UserForm from "../../shared/components/FormElements/UserForm"
import { AuthInputs } from "../types/userTypes"
import Button from "../../shared/components/FormElements/Button"
import { SendRequestProps } from "../../shared/types/formTypes"
import "../../shared/components/FormElements/UserForm.css"
import Modal from "../../shared/components/UIElements/Modal"


const getSingleUser = async(sendRequest: SendRequestProps, userId: string) => {
  try {
    const response = await sendRequest(`/api/users/${userId}`,
      'GET',
      null,
      {
        'Content-Type': 'application/json'
      }
    )
    console.log(response.user)
    return response.user
  } catch(err) {
    console.log(err)
  }
}

const Settings = () => {
  const auth = useContext(AuthContext)
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const {data} = useQuery({
    queryKey: ["single-user"],
    queryFn: () => typeof auth.userId === "string" && getSingleUser(sendRequest, auth.userId),
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors}
  } = useForm<AuthInputs>({
    defaultValues: data
  })

  const updateHandler:SubmitHandler<AuthInputs> = async(dataForm) => {
    try {
      const formData = new FormData()  
      formData.append('firstName', dataForm.firstName)
      formData.append('lastName', dataForm.lastName)
      formData.append('phone', dataForm.phone)
      formData.append('country', dataForm.country)
      formData.append('language', dataForm.language)
      formData.append('image', dataForm.image)

      const response = await sendRequest(`/api/users/${auth.userId}`,
          'PATCH',
          formData,
          {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth.token
          }
      )
      // if (response) {
      //   setTimeout(() => window.location.reload(), 500)
      // }
      
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
    window.location.reload()
  }

  useEffect(() => {
    reset(data)
  }, [isLoading])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal 
            show={showCancelModal} 
            onCancel={cancelModelHandle}
            header="Confirm"
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={
              <>
                <Button type="button" onClick={cancelChangesHandler}>CONFIRM</Button>
                <Button inverse type="button" onClick={cancelModelHandle}>CLOSE</Button>
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
            header="Confirm"
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={
              <>
                <Button type="button" onClick={deleteAccountHandler}>CONFIRM</Button>
                <Button inverse type="button" onClick={cancelDeleteHandle}>CLOSE</Button>
              </>
            }
        >
            <div className='map-container'>
               Are you sure you want to delete?
            </div>
        </Modal>
      { isLoading && <LoadingSpinner asOverlay/> }
      {
        data && 
        <form onSubmit={handleSubmit(updateHandler)}>
          <UserForm 
            register={register}
            setValue={setValue}
            errors={errors}
            imageUrl={`http://localhost:5068/${data.image}`}
            title="Account Settings"
            disabled={true}
          >
            <div className="py-3 pb-4 border-bottom">
              <Button type="submit">
                Save Changes
              </Button>
              <Button type="button" inverse onClick={openCancelHandler}>
                Cancel
              </Button>
            </div>
            <div 
              className="d-sm-flex align-items-center pt-3" id="delete">
                <div>
                    <b>Delete your account</b>
                </div>
                <div >
                    <Button danger type="button" onClick={openDeleteHandle}>Delete</Button>
                </div>
            </div>
          </UserForm>
        </form>
      }
    </React.Fragment>
  )
}

export default Settings