import React, { useState } from 'react'
import { InputHandlerProps } from '../../../../types/formTypes'
import FailedAlert from '../../../../components/Alert/FailedAlert'

import './CardTags.css'

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
        setTags([...tags, value])
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

    const cancelDuplicateModal = () => {
        setShowErrorModal(false)
    }

    return (
        <>
            <label className='mb-2.5 block font-medium text-black dark:text-white'>Tags</label>
            <div className='tags-input-container w-full rounded border border-stroke py-3 px-3 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'>
                { tags.length > 0 && tags.map((tag) => (
                    <div className='px-3 py-2.5 border border-slate-300 rounded-3xl' key={tag}>
                        <span className='text'>{tag}</span>
                        <span className='close ml-2 cursor-pointer' onClick={() => removeTag(tag)}>&times;</span>
                    </div>
                )) }
                <input
                    onKeyDown={handleKeyDown} 
                    type='text' 
                    placeholder='Enter new tag'
                    className="py-3 px-3 bg-gray rounded-lg text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                />
            </div>
            {
                showErrorModal && 
                <FailedAlert message="Duplicate tags" setShowUpdateFailed={cancelDuplicateModal}/>
            }
        </>
    )
}

export default CardTags;