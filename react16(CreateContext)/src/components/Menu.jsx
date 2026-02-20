import { useContext } from 'react'
import UserContext from '../context/user/UserContext'

export default function Menu(){
    const userDataContext = useContext(UserContext);
    
    function getMenu (rol) {
        if (rol === "ADMIN"){
            return  <nav>
                        <a href="#">Home</a> |
                        <a href="#">Products</a> |
                        <a href="#">Statistics</a> |
                        <a href="#">Admin Panel</a> |
                    </nav>
        }else{
            return <nav><a>Home</a> | <a>Products</a> |</nav>
        }
    }

    return (
        <div> { getMenu(userDataContext.rol) }</div>
    )
}