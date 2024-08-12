import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { useForm } from 'react-hook-form';
import Button from '../../shared/components/FormElements/Button';
import FormInput from '../../shared/components/FormElements/FormInput';
import FormTextarea from '../../shared/components/FormElements/FormTextarea';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import FormBase from '../components/FormBase/FormBase';
import { UserBaseProps } from '../types/userTypes';

const UpdateInfo = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<UserBaseProps>()

    const socialMediaLinks = [
        { platform: 'x', icon: XIcon, url: '' },
        { platform: 'linkedIn', icon: LinkedInIcon, url: '' },
        { platform: 'instagram', icon: InstagramIcon, url: '' },
        { platform: 'github', icon: GitHubIcon, url: '' },
        { platform: 'website', icon: LinkIcon, url: '' }
    ];

    const updateSubmitHandler = async() => {

    }
    
    return (
    <div>
        <FormBase
            title='Update additional information'
        >
            <div className='mx-4 mb-4'>
                <form className='max-w-4xl mx-auto bg-white sm:p-8 p-4 rounded-md' 
                    onSubmit={handleSubmit(updateSubmitHandler)}>
                    <div>
                        <ImageUpload 
                            register={register} 
                            center 
                            errorText={errors} 
                            setValue={setValue}
                            imageUrl='https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                        />
                    </div>
                    <div className='mb-4'>
                        <FormTextarea 
                            title='About me'
                            name='aboutMe'
                            placeholder='Enter about me'
                            register={register}
                        />
                    </div>
                    
                    <ul className='grid md:grid-cols-2 gap-8'>
                        {
                            socialMediaLinks.map((link) => (
                                <li key={link.platform}>
                                    <FormInput 
                                        title={link.platform}
                                        name={link.platform}
                                        placeholder={`Enter your ${link.platform}'s link`}
                                        type='text'
                                        register={register}
                                    />
                                </li>
                            ))
                        }
                    </ul> 
                </form>
                <div className='mt-8'>
                    <Button type='submit' default={true}>
                        Continue
                    </Button>
                </div>
            </div>
        </FormBase>
    </div>
  )
}

export default UpdateInfo