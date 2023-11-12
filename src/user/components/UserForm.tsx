import React from 'react'
import './UserForm.css'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

const UserForm = ({ register, errors, setValue, children }) => {
  return (
    <div>
        <div className="wrapper bg-white mt-sm-5">
        <h4 className="pb-4 border-bottom">Account settings</h4>

            <div className="d-flex align-items-start py-3 border-bottom">
                {/* <img src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    className="img" alt="" /> */}
                     <ImageUpload 
                        register={register} 
                        center 
                        id="image" 
                        // errorText={errors} 
                        setValue={setValue}
                    />     
                {/* <div className="pl-sm-4 pl-2" id="img-section">
                    <b>Profile Photo</b>
                    <p>Accepted file type .png. Less than 1MB</p>
                    <button className="btn button border"><b>Upload</b></button>
                </div> */}
            </div>
        <div className="py-2">
            <div className="row py-2">
                <div className="col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        {...register("firstName")}
                        placeholder="John"
                        className="bg-light form-control"
                    />
                    {errors.firstName?.message && <span>This field is required</span>}
                </div>
                <div className="col-md-6 pt-md-0 pt-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        {...register("lastName")}
                        placeholder="Doe"
                        className="bg-light form-control"
                    />
                    {errors.lastName?.message && <span>This field is required</span>}
                </div>
            </div>
            <div className="row py-2">
                <div className="col-md-6">
                    <label htmlFor="email">Email Address</label>
                    <input 
                            type="text" 
                            className="bg-light form-control" 
                            placeholder="john_doe@email.com" 
                            {...register("email", {required: "This is required.", pattern: /^\S+@\S+\.\S+$/ })}
                        />
                    </div>
                <div className="col-md-6 pt-md-0 pt-3">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        type="tel" 
                        className="bg-light form-control" 
                        placeholder="+358 1368 230797" 
                        {...register("phone")}
                    />
                    <span>{errors.email?.message}</span>
                </div>
            </div>
            <div className="row py-2">
                <div className="col-md-6">
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country" className="bg-light" {...register("country")}>
                        <option value="finland">Finland</option>
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                        <option value="uae">UAE</option>
                    </select>
                </div>
                <div className="col-md-6 pt-md-0 pt-3" id="lang">
                    <label htmlFor="language">Language</label>
                    <div className="arrow">
                        <select name="language" id="language" className="bg-light" {...register("language")}>
                            <option value="english">English</option>
                            <option value="english_us">English (United States)</option>
                            <option value="enguk">English UK</option>
                            <option value="arab">Arabic</option>
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