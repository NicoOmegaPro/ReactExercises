import { useContext } from 'react'
import UserContext from '../context/user/UserContext'

export default function Profile(){
  const user = useContext(UserContext);

  return (
    <div>Name user: {user.name}</div>
  )
}