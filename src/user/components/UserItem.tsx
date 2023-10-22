import { UserItemProps } from '../types/userTypes'
import './UserItem.css'

const UserItem = ({id, image, name, cardCount}: UserItemProps ) => {
  return (
    <section className="search-result-item">
      <a className="image-link" href="#"><img className="image" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
      </a>
      <div className="search-result-item-body">
          <div className="row">
              <div className="col-sm-9">
                  <h4 className="search-result-item-heading"><a href="#">{name}</a></h4>
                  <p className="info">New York, NY 20188</p>
                  {/* <p className="description">Not just usual Metro. But something bigger. Not just usual widgets, but real widgets. Not just yet another admin template, but next generation admin template.</p> */}
              </div>
              <div className="col-sm-3 text-align-center">
                  <p className="value3 mt-sm">{cardCount >= 1 ? cardCount : 0}</p>
                  <p className="fs-mini text-muted">{cardCount === 1 ? 'CARD' : 'CARDS'}</p><a className="btn btn-primary btn-info btn-sm" href="#">
                    View Cards
                  </a>
              </div>
          </div>
      </div>
  </section>

    
  )
}

export default UserItem