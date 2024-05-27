import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import TabPanelModal from "./components/TabPanelModal/TabPanelModal";
import UserDetailAbout from "./components/UserDetailAbout/UserDetailAbout";
import UserDetailWork from "./components/UserDetailWork/UserDetailWork";
import { SINGLE_USER } from "../../../shared/util/queries";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";

const projectsTypes = ['About', 'All cards']

const UserDetail = () => {
  let { userId } = useParams()
  const [ value, setValue ] = React.useState(0);
  const fetchData = useQuery(SINGLE_USER, {
    variables: { userId }
  })
  const [errorMessage, setError] = useState(fetchData?.error?.message)

  const data = fetchData?.data?.getUserDetail

  const clearError = () => {
    setError(undefined)
  }

  if (fetchData.loading) return <LoadingSpinner asOverlay/>

  return (
    <TabPanelModal 
      projectsTypes = {projectsTypes}
      value= {value}
      setValue= {setValue}
      image= {data?.image}
      fullName= {data && `${data.firstName} ${data.lastName}`}
    >
      {
        errorMessage && 
        <ErrorModal error={errorMessage} onClear={clearError} />
      }
      {
        projectsTypes[value] === 'About' && data
        ? <UserDetailAbout 
          aboutMe={data?.aboutMe}
          country={data?.country}
          email={data?.email}
          phone={data?.phone}
          language={data?.language}
          x= {data?.x}
          linkedIn= {data?.linkedIn}
          instagram= {data?.instagram}
          github= {data?.github}
          website= {data?.website}
        />
        : <UserDetailWork 
        cards={data?.cards}
        userId={userId as string}
        />
      }
    </TabPanelModal>
  );
};

export default UserDetail;
