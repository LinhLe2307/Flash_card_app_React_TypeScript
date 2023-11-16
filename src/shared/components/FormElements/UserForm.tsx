import ImageUpload from './ImageUpload'
import { UserFormProps } from '../../../user/types/userTypes'
import './UserForm.css'

const UserForm = ({ register, errors, setValue, imageUrl, title, disabled, children }: UserFormProps) => {
  return (
    <div>
        <div className="wrapper">
        <h4>{title}</h4>

            <div>
                {/* <img src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    className="img" alt="" /> */}
                    <ImageUpload 
                        register={register} 
                        center 
                        id="image" 
                        errorText={errors} 
                        setValue={setValue}
                        imageUrl={imageUrl}
                    />     

            </div>
        <div className="py-2">
            <div className="row py-2">
                <div className="form-control">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            id="firstName" 
                            {...register("firstName")}
                            placeholder="John"
                            className="bg-light form-control"
                            autoComplete="firstName"
                        />
                        {errors.firstName?.message && <span>This field is required</span>}
                </div>
                <div className="form-control">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            id="lastName" 
                            {...register("lastName")}
                            placeholder="Doe"
                            className="bg-light form-control"
                            autoComplete="lastName"
                        />
                        {errors.lastName?.message && <span>This field is required</span>}
                </div>
            </div>
            <div className="row py-2">
                <div className="form-control">
                    <label htmlFor="email">Email Address</label>
                    <input 
                            id="email"
                            disabled={disabled}
                            style={{
                                backgroundColor: "none"
                            }}
                            type="text" 
                            className="form-control" 
                            placeholder="john_doe@email.com" 
                            autoComplete="email"
                            {...register("email", {required: "This is required.", pattern: /^\S+@\S+\.\S+$/ })}
                        />
                    </div>
                <div className="form-control">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        id="phone"
                        type="tel" 
                        className="form-control" 
                        placeholder="+358 1368 230797" 
                        autoComplete="phone"
                        {...register("phone")}
                    />
                    <span>{errors.email?.message}</span>
                </div>
            </div>
            <div className="row py-2">
                <div className="form-control">
                    <label htmlFor="country">Country</label>
                    <select id="country" {...register("country")}>
                        <option value="finland">Finland</option>
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                        <option value="uae">UAE</option>
                    </select>
                </div>
                <div id="lang">
                    <label htmlFor="language">Language</label>
                    <div className="arrow">
                        <select id="language" {...register("language")}>
                            <option value="english">English</option>
                            <option value="finnish">Finnish</option>
                            <option value="swedish">Swedish</option>
                        </select>
                    </div>
                </div>
            </div>
            {children}
            </div>
        </div>
    </div>
  )
}

export default UserForm