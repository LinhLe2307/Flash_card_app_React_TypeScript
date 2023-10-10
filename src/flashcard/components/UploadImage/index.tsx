import { Button } from '@mui/material'

const UploadImage = () => {
  return (
    <Button
      variant="contained"
      component="label"
    >
      Upload Image
      <input
        type="file"
        hidden
      />
    </Button>
  )
}

export default UploadImage