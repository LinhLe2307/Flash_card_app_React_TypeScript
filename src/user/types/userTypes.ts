import { ReactNode } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"

interface BaseProps {
    id: string
    image: string
    firstName: string
    lastName: string
}

export interface UserProps extends BaseProps {
    cards: []
}

export interface UserItemProps extends BaseProps {
    cardCount: number
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

export type AuthInputs = {
    email: string
    password: string
    country: string
    language: string
    phone: string
    firstName: string
    lastName: string
    image: File
}

export type UserFormProps = {
    register: UseFormRegister<AuthInputs>
    errors: FieldErrors<AuthInputs>
    setValue: UseFormSetValue<AuthInputs>
    imageUrl: string
    title: string
    disabled: boolean
    children: React.ReactNode
}