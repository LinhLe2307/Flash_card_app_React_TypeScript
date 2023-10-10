import UsersList from "../components/UsersList"


const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Linh Le',
            image: 'https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80',
            cards: 3
        }
    ]
  return (
    <UsersList items={USERS}/>
  )
}

export default Users