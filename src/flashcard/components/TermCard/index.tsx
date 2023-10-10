import { Box, BoxProps, Button } from "@mui/material";
import FormInput from "../Form/FormInput";
import UploadImage from "../UploadImage";

interface TermCardProps {
  handleRemoveCard: (id:number) => void
  id: number
}

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

const TermCard = ({handleRemoveCard, id}:TermCardProps) => {
  return (
        <Box sx={{ flexDirection: "row", justifyContent: "center", display: "flex", alignItems:"center", width: "100vw" }}>
            <Item>
              <Box sx={{ display: 'flex', flexDirection: "row", width:"100%"}}>
                {id}
                <FormInput title="Term" defaultValue="Enter term"/>
                <FormInput title="Definition" defaultValue="Add a definition..."/>
                <UploadImage />
                <Button onClick={() => handleRemoveCard(id)}>Remove</Button>
              </Box>    
            </Item>
        </Box>
  )
}

export default TermCard