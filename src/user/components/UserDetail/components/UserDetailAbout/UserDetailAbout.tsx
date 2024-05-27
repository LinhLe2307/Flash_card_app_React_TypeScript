import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import XIcon from '@mui/icons-material/X';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import "./UserDetailAbout.css";
import { ObjectGenericProps } from '../../../../../shared/types/sharedTypes';


const croppedLink = (link: string) => {
  return link && link.replace(/^https?:\/\//, '');
}

const UserDetailAbout = ({ aboutMe, country, email, phone, language,
  x, linkedIn, instagram, github, website }: ObjectGenericProps<string> ) => {

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
          <p className='bio-text'>{ aboutMe as string }</p>
        </div>
      </div>
      <div className='about-content-sidebar'>
        <div className='content-section profile-info-section'>
          <ul>
            { email && <li className='info-item email'><EmailIcon/> {email}</li> }
            { phone && <li className='info-item location'><LocalPhoneIcon/>{phone}</li> }
            { language && <li className='info-item language'><LanguageIcon/>{language}</li> }
            { country && <li className='info-item country'><PublicIcon/>{country}</li> }
          </ul>
        </div>
        <div className='content-section'>
          <h2 className='section-label'>Social</h2>
          <ul className='social-links-list'>
            {
              socialMediaLinks.map((link) => (
                <li key={link.platform}>
                  <span><link.icon /></span>
                  { link.url 
                    ? <a href={`${link.url}`} target='_blank'>{croppedLink(link.url)}</a> 
                    : <span className='social-links-list-platform'>{link.platform}</span>}
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