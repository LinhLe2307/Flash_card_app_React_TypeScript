import { FormState, InputHandlerProps } from "../../shared/types/formTypes"
import { GenericProps, ObjectGenericProps } from "../../shared/types/sharedTypes"

export interface CardItemProps {
    id: string
    card: ObjectGenericProps<string>
}

export interface TermFlashcardProps {
    cardId: string, 
    inputHandler: InputHandlerProps,
    formState?: FormState,
    removeSubCardHandler: GenericProps<string>
}