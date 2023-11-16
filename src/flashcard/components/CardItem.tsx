import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Modal from '../../shared/components/UIElements/Modal'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { CardItemProps } from '../types/cardTypes'

const CardItem = ({id, card, onDelete, creator}: CardItemProps) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [showPreview, setShowPreview] = useState(false)
    // const [isUserMatched, setIsUserMatched] = useState(false);

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
    const confirmDeleteHandler = async (deletedCardId: string) => {
        setShowConfirmModal(false)
        try {
            await sendRequest(`/api/cards/${id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            )
            onDelete(deletedCardId)
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {/* <Modal 
            show={showPreview} 
            onCancel={closePreviewHandler}
            header={card.title}
            contentClass='card-item__modal-content'
            footerClass='card-item__modal-actions'
            footer={<Button onClick={closePreviewHandler}>CLOSE</Button>}
        >
            <div className='map-container'>
                The map
            </div>
        </Modal> */}
        <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            contentClass='card-item__modal-content'
            footerClass="place-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={() => confirmDeleteHandler(id)}>DELETE</Button>
                </React.Fragment>
            }
        >
            <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter</p>
        </Modal>
        <li className="card-item">
            <CardAvatar className="card-item__content">
                {/* <div className='card-item__image'>
                    <img src={image} alt={term}/>
                </div> */}
                {isLoading && <LoadingSpinner asOverlay />}
                <div className='card-item__info'>
                    <h2><Link to={`/card-detail/${card.id}`} state={{card}}>{card.title}</Link></h2>
                    <h2>{card.description}</h2>
                </div>
                <div className='card-item__actions'>
                    {/* <Button inverse onClick={openPreviewHandler}>PREVIEW</Button> */}
                    {
                        auth.isLoggedIn && auth.userId === creator && <>
                            <Button to={`/card-update/${id}`} state={card}>EDIT</Button>
                            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        </>
                    }    
                </div>
            </CardAvatar>
        </li>

    </React.Fragment>
  )
}

export default CardItem