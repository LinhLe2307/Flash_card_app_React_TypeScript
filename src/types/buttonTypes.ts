import { ReactNode } from "react"
import { ObjectGenericProps } from "./sharedTypes"

interface BaseProps {
    size?: string
    inverse?: boolean
    danger?: boolean
    default?: boolean
}
interface HerfProps extends BaseProps {
    href?: string
}

interface ToProps extends HerfProps {
    to?: string
    state?: ObjectGenericProps<string | string[]>
}
export interface ButtonProps extends ToProps {
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void 
    disabled?: boolean
    children?: ReactNode
}