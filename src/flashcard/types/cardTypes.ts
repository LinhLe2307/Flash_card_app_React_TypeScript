import { InputHandlerProps, ObjectGenericInitial, ValueAndValidProps } from "../../shared/types/formTypes"
import { GenericProps, ObjectGenericProps } from "../../shared/types/sharedTypes"

export interface CardItemProps{
    creator: string
    id: string
    card: ObjectGenericProps<string | ObjectGenericProps<string>[]>
    onDelete: (deletedCardId: string) => void
    userId?:string
}

export interface TermFlashcardProps {
    cardId: string, 
    inputHandler: InputHandlerProps,
    flashcard?: string | ObjectGenericInitial | ObjectGenericProps<ValueAndValidProps<string>> | string[],
    removeSubCardHandler: GenericProps<string>,
    length?: number
}
