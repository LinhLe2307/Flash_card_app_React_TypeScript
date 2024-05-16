import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import TabPanelModal from "./components/TabPanelModal/TabPanelModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { SendRequestProps } from "../../../shared/types/sharedTypes";
import UserDetailAbout from "./components/UserDetailAbout/UserDetailAbout";
import UserDetailWork from "./components/UserDetailWork/UserDetailWork";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const projectsTypes = ['About', 'Work']

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

const UserDetail = () => {
  let { userId } = useParams()
  const [ dataFetched, setDataFetched ] = useState(false);
  const [ value, setValue ] = React.useState(0);
  const { isLoading, error, sendRequest, clearError} = useHttpClient()
  const {data, isLoading: isLoadingQuery} = useQuery({
    queryKey: ['single-user'],
    queryFn: () => typeof userId === 'string' && getSingleUser(sendRequest, userId),
    enabled: !dataFetched
  })

  // Check if data is being fetched for the first time
  if (isLoadingQuery && !dataFetched) {
    // Set dataFetched to true to disable further queries
    setDataFetched(true);
  }

  if (isLoading) return <LoadingSpinner asOverlay/>

  return (
    <TabPanelModal 
      projectsTypes = {projectsTypes}
      value= {value}
      setValue= {setValue}
      image= {data?.image}
      fullName= {data && `${data.firstName} ${data.lastName}`}
    >
      <ErrorModal error={error} onClear={clearError} />
      {
        projectsTypes[value] === 'Work' && data
        ? <UserDetailWork 
          cards={data?.cards}
          userId={userId as string}
          />
        : <UserDetailAbout 
          aboutMe={data?.aboutMe}
          country={data?.country}
          email={data?.email}
          phone={data?.phone}
          x= {data?.x}
          linkedIn= {data?.linkedIn}
          instagram= {data?.instagram}
          github= {data?.github}
          website= {data?.website}
        />
      }
    </TabPanelModal>
  );
};

export default UserDetail;
