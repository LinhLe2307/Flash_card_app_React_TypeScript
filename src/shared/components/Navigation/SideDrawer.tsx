import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './SideDrawer.css'

interface SideDrawerProps {
    children: React.ReactNode
    show: boolean
    onClick: () => void
}

const SideDrawer = ({children, show, onClick}:SideDrawerProps) => {
    const nodeRef = React.useRef(null)
    const content = 
        <CSSTransition 
            in={show} 
            timeout={200} 
            classNames="slide-in-left" 
            mountOnEnter 
            unmountOnExit
            nodeRef={nodeRef}
        >
            <aside className='side-drawer' onClick={onClick}>{children}</aside>
        </CSSTransition>
  return (
    ReactDOM.createPortal(content, document.getElementById('drawer-hook')!)
  )
}

export default SideDrawer