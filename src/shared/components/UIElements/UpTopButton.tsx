import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import './UpTopButton.css';

const UpTopButton = () => {
  return (
    <Fab aria-label='up' id='backToTop' 
        onClick={() => window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      })}>
        <NavigationIcon />
      </Fab>
  )
}

export default UpTopButton