import React, { useRef, useState, useEffect } from 'react'
import { GenericProps } from '../../types/sharedTypes'
import Button from './Button'

import './ImageUpload.css'
import '../../../user/components/UserForm/UserForm.css'
import { ImageUploadProps } from '../../types/imageTypes';


const ImageUpload = ({ center, errorText, register, setValue, imageUrl }: ImageUploadProps) => {
    const [file, setFile] = useState<Blob>()
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer>()
    const [isValid, setIsValid] = useState(false)
    
    const filePickerRef = useRef<HTMLInputElement | null>()
    const { ref, ...rest } = register('image')

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            fileReader && fileReader.result && setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])

    const pickedHandler: GenericProps<React.ChangeEvent<HTMLInputElement>> = (event) => {
        let pickedFile
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            setValue("image", pickedFile)
        } else {
            setIsValid(false)
        }
    }

    const pickImageHandler = () => {
        filePickerRef && filePickerRef.current?.click()
    }

  return (
    <div className="form-control">
        <input 
            {...rest}
            style={{ display: "none" }}
            name="image"
            type="file"
            accept=".jpg,.png,.jpeg"
            ref={(e) => {
                ref(e)
                filePickerRef.current = e
            }}
            onChange={pickedHandler}
            autoComplete="image"
        />
        <div className={`image-upload ${center && "center"}`}>
            <div className="image-upload__preview">
                { previewUrl && <img src={String(previewUrl)} alt="Preview"/> }
                { !previewUrl && <img src={imageUrl}/> }
            </div>
            <div className="pl-sm-4 pl-2" id="img-section">
                <b>Profile Photo</b>
                <p>Accepted file type .jpg, .png, .jpeg. Less than 1MB</p> 
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
        </div>
        { !isValid && <p>{ errorText?.image?.message as string }</p> }
    </div>
  )
}

export default ImageUpload