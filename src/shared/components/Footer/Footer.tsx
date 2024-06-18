import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';
const Footer = () => {
  const socialMediaLinks = [
    { platform: 'linkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/linh-le-96baaa154/' },
    { platform: 'github', icon: GitHubIcon, url: 'https://github.com/LinhLe2307' },
    { platform: 'website', icon: LinkIcon, url: 'https://linh-my-le.netlify.app/' }
  ];
  return (
    <footer className='footer-page'>
      <div className='horizontal-line'></div>
      <div className='footer-container'>
        <h2>About Me</h2>
        <div className='social-icons'>
          {
            socialMediaLinks.map(link => (
              <a href={`${link.url}`} key={link.platform}><i><link.icon /></i></a>
            ))
          }
        </div>
        <div className='footer-nav'>
            <ul><li><a href='/'>Home</a></li>
                <li><a href='/'>About</a></li>
                <li><a href='/'>Contact Me</a></li>
            </ul>
        </div>
          
      </div>
      <div className='footer-bottom'>
          <p>Copyright &copy;{new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer