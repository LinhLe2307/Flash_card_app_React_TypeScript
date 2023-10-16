import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import { CardItemProps } from '../types/cardTypes'
import Button from '../../shared/components/FormElements/Button'
import React, { useContext, useState } from 'react'
import Modal from '../../shared/components/UIElements/Modal'
import { AuthContext } from '../../shared/context/auth-context'

const CardItem = ({id, term, definition, image, creatorId}: CardItemProps) => {
    const auth = useContext(AuthContext)
    const [showPreview, setShowPreview] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openPreviewHandler = () => {
        setShowPreview(true)
    }
    const closePreviewHandler = () => {
        setShowPreview(false)
    }

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }
    const confirmDeleteHandler = () => {
        setShowConfirmModal(false)
        console.log('DELETE')
    }

  return (
    <React.Fragment>
        <Modal 
            show={showPreview} 
            onCancel={closePreviewHandler}
            header={term}
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={<Button onClick={closePreviewHandler}>CLOSE</Button>}
        >
            <div className='map-container'>
                The map
            </div>
        </Modal>
        <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            contentClass='card-item__modal-content'
            footerClass="place-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }
        >
            <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter</p>
        </Modal>
        <li className="card-item">
            <CardAvatar className="card-item__content">
                <div className='card-item__image'>
                    <img src={image} alt={term}/>
                </div>
                <div className='card-item__info'>
                    <h2>{term}</h2>
                    <h2>{definition}</h2>
                </div>
                <div className='card-item__actions'>
                    <Button inverse onClick={openPreviewHandler}>PREVIEW</Button>
                    {
                        auth.isLoggedIn && <>
                            <Button to={`/card/${id}`}>EDIT</Button>
                            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        </>
                    }           

                    <Button to={`/card/${id}`}>EDIT</Button>
                    <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        
                </div>
            </CardAvatar>
        </li>

    </React.Fragment>
  )
}

export default CardItem