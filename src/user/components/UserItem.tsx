import { UserItemProps } from '../types/userTypes'
import './UserItem.css'

const UserItem = ({id, image, firstName, lastName, cardCount}: UserItemProps ) => {
  return (
    <section className="search-result-item">
      <a className="image-link" href="#"><img className="image" src={`http://localhost:5068/${image}`} />
      </a>
      <div className="search-result-item-body">
          <div className="row">
              <div className="col-sm-9">
                  <h1 className="search-result-item-heading">{firstName} {lastName}</h1>
                  {/* <h1 className="search-result-item-heading"><a href={`/user-detail/${id}`}>{firstName} {lastName}</a></h1> */}
                  <p className="info">Helsinki, Finland</p>
              </div>
              <div className="col-sm-3 text-align-center">
                  <p className="value3 mt-sm">{cardCount >= 1 ? cardCount : 0}</p>
                  <p className="fs-mini text-muted">{cardCount === 1 ? 'CARD' : 'CARDS'}</p><a className="btn btn-info btn-sm" href={`/cards-user/${id}`}>
                    View Cards
                  </a>
              </div>
          </div>
      </div>
  </section>

    
  )
}

export default UserItem