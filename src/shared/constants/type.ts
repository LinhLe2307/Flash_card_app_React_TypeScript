import { ReactNode } from "react"

export interface UserProps {
    id: string
    image: string
    name: string
    cards: number
}

export interface UsersListProps {
    items: UserProps[] 
}

export interface UserItemProps {
    id: string
    image: string
    name: string
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
    className: string
    // style: string
}