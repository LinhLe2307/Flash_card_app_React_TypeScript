import { ReactNode } from "react"

export interface ModalOverlayProps {
    className?: string
    style?: string
    headerClass?: string
    header: string
    onSubmit?: ()=>void
    contentClass?: string 
    children?: ReactNode
    footerClass?: string
    footer: ReactNode 
}

export interface ModalProps extends ModalOverlayProps {
    show: boolean
    onCancel: ()=>void
    
}