import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import XIcon from '@mui/icons-material/X';
import { UserBaseProps } from '../../../../types/userTypes'
import "./UserDetailAbout.css";


const UserDetailAbout = ({ aboutMe, country, email, phone, 
  x, linkedIn, instagram, github, website }: UserBaseProps ) => {
    
  // Array of social media platforms and their URLs
  const socialMediaLinks = [
    { platform: 'x', icon: XIcon, url: x },
    { platform: 'linkedIn', icon: LinkedInIcon, url: linkedIn },
    { platform: 'instagram', icon: InstagramIcon, url: instagram },
    { platform: 'github', icon: GitHubIcon, url: github },
    { platform: 'website', icon: LinkIcon, url: website }
  ];
  return (
    <div className='container-small'>
    <div className='about-content'>
      <div className='about-content-main'>
        <div className='content-section'>
          <h2 className="section-label">Biography</h2>
          <p>{ aboutMe as string }</p>
        </div>
      </div>
      <div className='about-content-sidebar'>
        <div className='content-section profile-info-section'>
          <ul>
            <li className='info-item email'><EmailIcon/> {email as string}</li>
            <li className='info-item location'><LocalPhoneIcon/>{phone as string}</li>
            <li className='info-item country'>{country as string}</li>
          </ul>
        </div>
        <div className='content-section'>
          <h2 className="section-label">Social</h2>
          <ul className='social-links-list'>
            {
              socialMediaLinks.map((link) => (
                <li key={link.platform}>
                  <span><link.icon /></span>
                  <a>{link.url ? link.url as string : link.platform}</a>
                </li>
                ))
              }
          </ul> 
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserDetailAbout