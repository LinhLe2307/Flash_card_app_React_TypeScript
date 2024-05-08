import React from 'react';

import { AvatarProps } from '../../../user/types/userTypes';
import './Avatar.css';

const Avatar = ({image, alt}: AvatarProps) => {
  return (
    <div 
    className={`avatar`}
    // className={`avatar ${className}`} 
    // style={style}
    >
      <img
        src={image}
        alt={alt}
        // style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;
