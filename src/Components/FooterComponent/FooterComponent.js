import './FooterComponent.scss'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


function FooterComponent() {



    return (
        <>
            <div className='icons'>
                <a href="https://github.com/omer117">
                    <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/omer-asraf/">
                    <LinkedInIcon />
                </a>
                <a href="mailto: omer.asraf91@gmail.com">
                    <EmailIcon />
                </a>
            </div>
        </>
    )
}

export default FooterComponent