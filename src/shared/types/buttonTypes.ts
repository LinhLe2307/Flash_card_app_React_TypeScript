import { ReactNode } from "react"

interface BaseProps {
    size?: string
    inverse?: boolean
    danger?: boolean
}
interface HerfProps extends BaseProps {
    href?: string
}

interface ToProps extends HerfProps {
    to?: string
}
export interface ButtonProps extends ToProps {
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void 
    disabled?: boolean
    children?: ReactNode
}