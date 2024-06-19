import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from 'react-router-dom';

import { UserItemProps } from '../../types/userTypes';
import './UserItem.css';

const UserItem = ({id, image, firstName, lastName, language, cardCount, country, phone, email}: UserItemProps ) => {
  return (
    <section className='search-result-item'>
      <div className='search-result__background'></div>
      <a className='image-link' href='#'><img className='image' src={`${image}`} />
      </a>
      <div className='search-result-item__body'>
          <div className='search-result-row'>
              <div className='search-result-info'>
                  <h1 className='search-result-item__heading'>{firstName} {lastName}</h1>
                  <p className='info'>
                    <EmailIcon/>
                    <span>{email}</span>
                  </p>
                  { phone && <p className='info'>
                    <LocalPhoneIcon/>
                    <span>{phone}</span>
                  </p> }
                  { country && <p className='info'>
                    <LanguageIcon/>
                    <span>{country}</span>
                  </p> }
                  { language && <p className='info'>
                    <PublicIcon/>
                    <span>{language}</span>
                  </p> }
              </div>
              <div className='search-result-item__view'>
                <p>{cardCount as number >= 1 ? cardCount : 0} {cardCount === 1 ? 'CARD' : 'CARDS'}</p>
                <Link to={`/user-detail/${id}`} state={{ initialValue: 1 }}>
                  View Cards
                </Link>
              </div>
          </div>
      </div>
      <div className='search-result-item__view-profile'>
        <Link to={`/user-detail/${id}`} state={{ initialValue: 0 }}>
          VIEW PROFILE
        </Link>
      </div>
  </section>

    
  )
}

export default UserItem