import { FormState, InputHandlerProps } from "../../shared/types/formTypes"
import { GenericProps } from "../../shared/types/sharedTypes"

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

export interface TermFlashcardProps {
    cardId: string, 
    inputHandler: InputHandlerProps,
    formState?: FormState,
    removeSubCardHandler: GenericProps<string>
}