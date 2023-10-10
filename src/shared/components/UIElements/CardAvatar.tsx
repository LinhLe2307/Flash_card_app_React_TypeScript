import { CardAvatarProps } from '../../constants/type'
import './CardAvatar.css'

const CardAvatar = ({children, className}: CardAvatarProps) => {
  return (
    <div className={`card ${className}`} 
    // style={style}
    >
        {children}
    </div>
  )
}

export default CardAvatar