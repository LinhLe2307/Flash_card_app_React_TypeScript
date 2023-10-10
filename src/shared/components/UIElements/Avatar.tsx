import './Avatar.css';
import { AvatarProps } from '../../constants/type';

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
