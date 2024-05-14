import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
    const auth = useContext(AuthContext)

  return (
    <ul className='nav-links'>
        <li>
            <NavLink to="/">HOME</NavLink>
        </li>
        <li>
            <NavLink to="/all-users">ALL USERS</NavLink>
        </li>
        {
            auth.isLoggedIn && <li>
            <NavLink to={`/cards-user/${auth.userId}`}>MY CARDS</NavLink>
        </li>
        }
        {
            auth.isLoggedIn && <li>
            <NavLink to="/card/new">ADD CARD</NavLink>
        </li>
        }
        {
            auth.isLoggedIn && <li>
            <NavLink to="/settings">SETTINGS</NavLink>
        </li>
        }
        { !auth.isLoggedIn && <li>
            <NavLink to="/auth">SIGN IN</NavLink>
        </li>
        }
        { auth.isLoggedIn && <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>
        }
        
    </ul>
  )
}

export default NavLinks