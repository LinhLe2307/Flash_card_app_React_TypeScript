import { useAuth } from '../../hooks/auth-hook';
import './Avatar.css';

const Avatar = () => {
  const auth = useAuth()
  return (
    <div 
    className={`avatar`}
    // className={`avatar ${className}`} 
    // style={style}
    >
      <img
        src={auth.image}
        alt='Avatar image'
        style={{ width: '3rem', height: '3rem' }}
      />
    </div>
  );
};

export default Avatar;
