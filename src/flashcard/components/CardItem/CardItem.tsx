import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../../shared/components/FormElements/Button'
import CardAvatar from '../../../shared/components/UIElements/CardAvatar'
import ErrorModal from '../../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import Modal from '../../../shared/components/UIElements/Modal'
import { AuthContext } from '../../../shared/context/auth-context'
import { CardItemProps } from '../../types/cardTypes'
import './CardItem.css'
import { useMutation } from '@apollo/client'
import { DELETE_CARD } from '../../../shared/util/queries'

const CardItem = ({id, card, onDelete, creator, userId}: CardItemProps) => {
    const auth = useContext(AuthContext)
    const [ showConfirmModal, setShowConfirmModal ] = useState(false)

    const [deleteCard, { loading, error }] = useMutation(DELETE_CARD)
    const [errorMessage, setError] = useState(error?.message)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }
    const confirmDeleteHandler = async (deletedCardId: string) => {
        setShowConfirmModal(false)
        try {
            await deleteCard({
                variables: {
                    cardId: deletedCardId,
                    userId: auth.userId
                }
            })
            onDelete(deletedCardId)
        } catch(err) {
            console.log(err)
        }
    }

    const clearError = () => {
        setError(undefined)
    }

    if (errorMessage) {
        <ErrorModal error={errorMessage} onClear={clearError}/>
    }

  return (
    <React.Fragment>
        <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header='Are you sure?'
            contentClass='card-item__modal-content'
            footerClass='place-item__modal-actions'
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={() => confirmDeleteHandler(id)}>DELETE</Button>
                </React.Fragment>
            }
        >
            <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter</p>
        </Modal>
        <li className='card-item'>
            <CardAvatar className='card-item__content'>
                {/* <div className='card-item__image'>
                    <img src={image} alt={term}/>
                </div> */}
                {loading && <LoadingSpinner asOverlay />}
                <div className='card-item__info'>
                    <h2><Link to={`/card-detail/${card.id}`} state={{ card }}>{ typeof card.title === 'string' && card.title }</Link></h2>
                    <p>{ typeof card.description === 'string' && card.description }</p>
                    {
                        <div className='card-item__tags'>
                            { Array.isArray(card.tags)
                                && card.tags.map((tag) => <span 
                                    key={tag?.name}
                                    className='card-item__tag'
                                >
                                    <Link to={`/user-detail/${userId}`} state={{ initialValue: 1, tag: tag?.name }}>{tag?.name}</Link>
                                </span>)
                            }
                        </div>
                    }
                </div>
                <div className='card-item__actions'>
                    {/* <Button inverse onClick={openPreviewHandler}>PREVIEW</Button> */}
                    {
                        auth.isLoggedIn && auth.userId === creator && <>
                            <Button to={`/card-update/${id}`}>EDIT</Button>
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