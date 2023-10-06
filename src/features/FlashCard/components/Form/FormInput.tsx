import { FormControl, TextField } from '@mui/material'

interface FormInputProps {
    title: string
    defaultValue: string
}

const FormInput = ({title, defaultValue}:FormInputProps) => {
  return (
    <FormControl variant="standard" fullWidth>
        <TextField
          id="standard-search"
          label={title}
          placeholder={defaultValue}
          type="search"
          variant="standard"
        />
    </FormControl>
  )
}

export default FormInput