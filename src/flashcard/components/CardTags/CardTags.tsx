import React, { useState } from 'react'
import { InputHandlerProps } from '../../../shared/types/formTypes'

import './CardTags.css'
import ErrorModal from '../../../shared/components/UIElements/ErrorModal'

const CardTags = ({ inputHandler, initialValue=[] }: { inputHandler: InputHandlerProps, initialValue: string[] }) => {
    const [tags, setTags] = useState<string[]>(initialValue)
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const value = target.value.trim()
        if(!value.trim()) return
        if(tags.find(tag => tag.toLowerCase() === value.toLowerCase()) !== undefined) {
            setShowErrorModal(true)
            return;
        }
        setTags(prev => prev.concat(value))
        inputHandler([...tags, value], true, 'tags', 'tags')
        target.value = ''
    }

    const removeTag = (tag: string) => {
        const filterTags = tags.filter((el) => el !== tag);
        setTags(filterTags);
        filterTags.length !== 0 
        ? inputHandler(filterTags, true, 'tags', 'tags')
        : inputHandler([''], true, 'tags', 'tags')
    }

    const cancelDuplicateModel = () => {
        setShowErrorModal(false)
    }

    return (
        <>
            <label>Tags</label>
            {
                showErrorModal && 
                <ErrorModal 
                    error='Duplicate tag, please try again'
                    onClear={cancelDuplicateModel}
                />
            }
            <div className='tags-input-container'>
                { tags.length > 0 && tags.map((tag) => (
                    <div className='tag-item' key={tag}>
                        <span className='text'>{tag}</span>
                        <span className='close' onClick={() => removeTag(tag)}>&times;</span>
                    </div>
                )) }
                <input 
                    onKeyDown={handleKeyDown} 
                    type='text' 
                    className='tags-input' 
                    placeholder='Enter new tag'
                />
            </div>
        </>
    )
}

export default CardTags;