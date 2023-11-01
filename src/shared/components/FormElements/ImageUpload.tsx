import { useRef, useState, useEffect } from 'react'
import { GenericProps } from '../../types/sharedTypes'
import Button from './Button'

import './ImageUpload.css'
import { ImageUploadProps } from '../../types/imageTypes';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

const ImageUpload = ({ id, center, onInput, errorText, nameId }: ImageUploadProps) => {
    const [file, setFile] = useState<string>()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
    
    const filePickerRef = useRef<HTMLInputElement>()

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])

    const pickedHandler: GenericProps<React.ChangeEventHandler<HTMLInputEvent>> = (event) => {
        let pickedFile
        let fileIsValid = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid= true
        } else {
            setIsValid(false)
            fileIsValid= false
        }
        onInput(pickedFile, fileIsValid, id, nameId)
    }

    const pickImageHandler = () => {
        filePickerRef && filePickerRef.current.click()
    }

  return (
    <div className="form-control">
        <input 
            id={id} 
            ref={filePickerRef}
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
        />
        <div className={`image-upload ${center && "center"}`}>
            <div className="image-upload__preview">
                { previewUrl && <img src={previewUrl} alt="Preview"/> }
                { !previewUrl && <p>Please pick an image.</p> }
            </div>
            <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
        { !isValid && <p>{ errorText }</p> }
    </div>
  )
}

export default ImageUpload