import { ReactNode } from "react"

interface BaseProps {
    id: string
    image: string
    name: string
}

export interface UserProps extends BaseProps {
    cards: number
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