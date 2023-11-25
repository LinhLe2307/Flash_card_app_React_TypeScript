import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
import { useFormHook } from '../../hooks/form-hook';
import { useDispatch } from 'react-redux';

const NavLinks = () => {
    const auth = useContext(AuthContext)
    const [formState, removeSubCardHandler, inputHandler, addMoreCardHandler, setFormData, resetState] = useFormHook()
    const newPageReset = () => {
        resetState("new_card")
    }
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to="/">ALL USERS</NavLink>
        </li>
        {
            auth.isLoggedIn && <li>
            <NavLink to={`/cards-user/${auth.userId}`}>MY CARDS</NavLink>
        </li>
        }
        {
            auth.isLoggedIn && <li>
            <NavLink to="/card/new" onClick={newPageReset}>ADD CARD</NavLink>
        </li>
        }
        {
            auth.isLoggedIn && <li>
            <NavLink to="/settings">SETTINGS</NavLink>
        </li>
        }
        { !auth.isLoggedIn && <li>
            <NavLink to="/auth">LOGIN</NavLink>
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