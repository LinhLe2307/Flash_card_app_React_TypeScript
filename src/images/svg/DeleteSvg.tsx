import React from 'react'

const DeleteSvg = ({className}) => {
  return (
    // <span className={className} onClick={onClick}>
    //   <svg 
    //     aria-hidden="true" 
    //     xmlns="http://www.w3.org/2000/svg" 
    //     width="24" height="24" 
    //     fill="none" 
    //     viewBox="0 0 24 24"
    //   >
    //     <g opacity="0.8" clipPath="url(#clip0_88_10224)">
    //       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
    //     </g>
    //   </svg>
    // </span>
    <span className={className}>
      <svg className="w-6 h-6" 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <g opacity="0.8">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
        </g>
      </svg>
    </span>

  )
}

export default DeleteSvg