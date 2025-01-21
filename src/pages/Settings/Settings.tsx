import { useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ImageUpload from '../../components/Forms/FormElements/ImageUpload';
import { AuthContext } from "../../context/authContext";
import { DELETE_USER, SINGLE_USER } from "../../queries/queries";
import UpdateSocialMedia from './components/UpdateSocialMedia';
import UpdateUser from './components/UpdateUser';
import UpdatePassword from './components/UpdatePassword';

const Settings = () => {
  const auth = useContext(AuthContext)
  const { loading, error, data } = useQuery(SINGLE_USER, {
    variables: { userId: auth && auth.userId }
  })

  const userDetail = data?.getUserDetail
  const [ deleteUser ] = useMutation(DELETE_USER)

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

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings"/>

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <UpdateUser 
              data={data}
              userDetail={userDetail}
            />
            <UpdatePassword />
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <ImageUpload image={data && data.getUserDetail.image}/>
            </div>

            <UpdateSocialMedia 
              data={data}
              userDetail={userDetail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
