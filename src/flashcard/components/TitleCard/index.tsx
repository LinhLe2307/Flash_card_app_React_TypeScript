import FormInput from "../Form/FormInput"

const TitleCard = () => {
  return (
    <>
        <FormInput title="title" defaultValue="Enter a title"/>
        <FormInput title="description" defaultValue="Add a description..."/>
    </>
  )
}

export default TitleCard