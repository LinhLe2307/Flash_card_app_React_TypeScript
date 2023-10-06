import { Box, Button, Grid } from "@mui/material"
import TitleCard from "../../components/TitleCard"
import { DEFAULT_CARDS } from "../../../../constants/global"
import TermCard from "../../components/TermCard"

const AddCard = () => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TitleCard />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {
                DEFAULT_CARDS.map(card => <TermCard />)
            }
            <Button type="button">Add</Button>
        </Box>
        <Button type="submit">Create</Button>
    </Box>
  )
}

export default AddCard