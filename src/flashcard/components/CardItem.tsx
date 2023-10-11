import CardAvatar from '../../shared/components/UIElements/CardAvatar'
import { CardItemProps } from '../types/cardTypes'
import Button from '../../shared/FormElements/Button'
import React, { useState } from 'react'
import Modal from '../../shared/components/UIElements/Modal'

const CardItem = ({id, term, definition, image, creatorId}: CardItemProps) => {
    const [showPreview, setShowPreview] = useState(false)

    const openPreviewHandler = () => {
        setShowPreview(true)
    }
    const closePreviewHandler = () => {
        setShowPreview(false)
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
                    <Button to={`/places/${id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </CardAvatar>
        </li>

    </React.Fragment>
  )
}

export default CardItem