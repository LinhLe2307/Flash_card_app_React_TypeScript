import { ReactNode } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"

export enum SocialMediaType {
    x='x',
    linkedIn='linkedIn',
    instagram='instagram',
    github='github',
    website='website'
}

export enum UserInfoType {
    country='country',
    language='language',
    phone='phone',
    firstName='firstName',
    lastName='lastName',
    email='email',
    aboutMe='aboutMe'
}

export interface UserItemProps {
    [key: string]: number | string | []
}
export interface UserBaseProps {
    [key: string]: SocialMediaType | UserInfoType | string | File | number | []
}

export interface UserProps extends UserBaseProps {
    cards: []
    image: string
}


export interface AvatarProps {
    image: string 
    alt: string 
    // className: string | undefined 
    // style: string | undefined
    // width: string | undefined
}

export interface CardAvatarProps {
    children: ReactNode
    className?: string
    // style: string
}

export type UserFormProps = {
    register: UseFormRegister<UserBaseProps>
    errors: FieldErrors<UserBaseProps>
    setValue: UseFormSetValue<UserBaseProps>
    imageUrl: string
    title: string
    disabled: boolean
    children: React.ReactNode
}