import { useEffect, useState } from 'react'
import { InputHandlerProps } from '../../../shared/types/formTypes'

import './CardTags.css'

const CardTags = ({ inputHandler, initialValue }: { inputHandler: InputHandlerProps, initialValue: string[] }) => {
    const [tags, setTags] = useState<string[]>([])

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key !== 'Enter') return
        const target = e.target as HTMLInputElement;
        const value = target.value
        if(!value.trim()) return
        if(tags.find(tag => tag.toLowerCase() === value.toLowerCase()) !== undefined) return
        setTags([...tags, value])
        inputHandler([...tags, value], true, 'tags', 'tags')
        target.value = ''
    }

    function removeTag(tag: string){
        setTags(tags.filter((el) => el !== tag))
    }

    useEffect(() => {
        setTags(initialValue)
    }, [initialValue])

    return (
        <>
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