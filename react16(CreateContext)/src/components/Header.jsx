import { useContext } from 'react'
import Menu from './Menu'
import Profile from './Profile'
import UserContext from "../context/user/UserContext";

export default function Header(){

  const userDataContext = useContext(UserContext);

  return (
    <header>
      <Menu/>
      <Profile/>
      <div>Language: {userDataContext.language} </div>
    </header>
  )
}