import { NavLink } from 'react-router-dom'
import './NavLinks.css'

const NavLinks = () => {
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to="/">ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to="/u1/cards">MY CARDS</NavLink>
        </li>
        <li>
            <NavLink to="/card/new">ADD CARD</NavLink>
        </li>
        <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
    </ul>
  )
}

export default NavLinks