import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import Avatar from '../UIElements/Avatar';
import './NavLinks.css';

const NavLinks = () => {
    const auth = useContext(AuthContext)
    const [isOpenSection, setIsOpenSection] = useState(false)

    const handleClickAvatar = () => {
        setIsOpenSection((prevState) => !prevState)
    }
 
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to="/">HOME</NavLink>
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
        { !auth.isLoggedIn && <li>
            <NavLink to="/auth">SIGN IN</NavLink>
        </li>
        }
        <div>
            { auth.isLoggedIn && 
            <li onClick={handleClickAvatar} className='nav-links__container'>
                <Avatar/>
            </li>
            }
            {
                isOpenSection &&  
                <div className='nav-links__modal'>
                    <NavLink to="/settings" onClick={handleClickAvatar}>SETTINGS</NavLink>
                    <button onClick={() => {
                        auth.logout();
                        handleClickAvatar()
                    }}>LOG OUT</button>
                </div>
            }
        </div>
        
    </ul>
  )
}

export default NavLinks