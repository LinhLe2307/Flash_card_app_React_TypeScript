import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file ) return;
    try {
      const { data } = await uploadImage({
        variables: { file },
      });
      console.log('Image URL:', data.uploadImage.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
