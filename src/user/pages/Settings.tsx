import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../../shared/components/FormElements/Button"
import ImageUpload from "../../shared/components/FormElements/ImageUpload"
import { AuthInputs } from "./Auth"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import { useQuery } from "@tanstack/react-query"
import UserForm from "../components/UserForm"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import "../components/UserForm.css"

const getSingleUser = async(sendRequest, auth) => {
  try {
    const response = await sendRequest(`/api/users/${auth.userId}`,
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
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const {data} = useQuery({
    queryKey: ["single-user"],
    queryFn: () => getSingleUser(sendRequest, auth),
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<AuthInputs>({
    defaultValues: data
  })

  useEffect(() => {
    reset(data)
  }, [isLoading])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {
        data &&
        <form onSubmit={handleSubmit()}>
          { isLoading && <LoadingSpinner asOverlay/> }
          <UserForm 
            register={register}
            errors={errors}
          >
            <div className="py-3 pb-4 border-bottom">
                <button className="btn btn-primary mr-3">Save Changes</button>
                <button className="btn border button">Cancel</button>
            </div>
            <div className="d-sm-flex align-items-center pt-3" id="deactivate">
                <div>
                    <b>Deactivate your account</b>
                    <p>Details about your company account and password</p>
                </div>
                <div className="ml-auto">
                    <button className="btn danger">Deactivate</button>
                </div>
            </div>
          </UserForm>
        </form>
      }
    </React.Fragment>
  )
}

export default Settings