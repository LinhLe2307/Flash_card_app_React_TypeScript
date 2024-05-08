import { useState } from 'react'
import { InputHandlerProps } from '../../../shared/types/formTypes'

import './CardTags.css'
import ErrorModal from '../../../shared/components/UIElements/ErrorModal'

const CardTags = ({ inputHandler, initialValue }: { inputHandler: InputHandlerProps, initialValue: string[] }) => {
    const [tags, setTags] = useState<string[]>(initialValue)
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const value = target.value
        if(!value.trim()) return
        if(tags.find(tag => tag.toLowerCase() === value.toLowerCase()) !== undefined) {
            setShowErrorModal(true)
            return;
        }
        setTags([...tags, value])
        inputHandler([...tags, value], true, 'tags', 'tags')
        target.value = ''
    }

    const removeTag = (tag: string) => {
        const filter_tags = tags.filter((el) => el !== tag);
        console.log(filter_tags)
        setTags(filter_tags);
        inputHandler(filter_tags, true, 'tags', 'tags')
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
                { tags.map((tag) => (
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