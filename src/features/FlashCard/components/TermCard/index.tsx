import { Box, BoxProps, Grid } from "@mui/material"
import FormInput from "../Form/FormInput"
import UploadImage from "../UploadImage"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

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

const TermCard = () => {
  return (
        <Box sx={{ flexDirection: "row", justifyContent: "center", display: "flex", alignItems:"center", width: "100vw" }}>
            <Item>
              <Box sx={{ display: 'flex', flexDirection: "row", width:"100%"}}>
                <FormInput title="Term" defaultValue="Enter term"/>
                <FormInput title="Definition" defaultValue="Add a definition..."/>
                <UploadImage />
              </Box>    
            </Item>
        </Box>
  )
}

export default TermCard