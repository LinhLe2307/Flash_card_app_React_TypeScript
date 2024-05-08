import ReactDOM from 'react-dom'
import React from 'react';

import './Backdrop.css'

interface BackdropProps {
    onClick: () => void
}

const Backdrop = ({onClick} : BackdropProps) => {
  return (
    ReactDOM.createPortal(
        <div className='backdrop' onClick={onClick}></div>, document.getElementById('backdrop-hook')!
    )
  )
}

export default Backdrop