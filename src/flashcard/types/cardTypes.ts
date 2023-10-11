interface BaseProps {
    id: string
    term: string
    definition: string
} 
export interface CardProps extends BaseProps {
    imageUrl: string
    creator: string | undefined
}

export interface CardItemProps extends BaseProps {
    image: string
    creatorId: string | undefined
}