import { useRef, useState, useEffect } from 'react'
import { GenericProps } from '../../types/sharedTypes'
import Button from './Button'

import './ImageUpload.css'
import { ImageUploadProps } from '../../types/imageTypes';


const ImageUpload = ({ id, center, errorText, register, setValue }: ImageUploadProps) => {
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
        let fileIsValid = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            setValue("image", event.target.files[0])
            fileIsValid= true
        } else {
            setIsValid(false)
            fileIsValid= false
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
        />
        <div className={`image-upload ${center && "center"}`}>
            <div className="image-upload__preview">
                { previewUrl && <img src={String(previewUrl)} alt="Preview"/> }
                { !previewUrl && <p>Please pick an image.</p> }
            </div>
            <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
        </div>
        { !isValid && <p>{ errorText?.image?.message }</p> }
    </div>
  )
}

export default ImageUpload