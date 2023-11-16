import { InputHandlerProps, ObjectGenericInitial, ValueAndValidProps } from "../../shared/types/formTypes"
import { GenericProps, ObjectGenericProps } from "../../shared/types/sharedTypes"

export interface CardItemProps{
    creator: string
    id: string
    card: ObjectGenericProps<string>,
    onDelete: (deletedCardId: string) => void
}

export interface TermFlashcardProps {
    cardId: string, 
    inputHandler: InputHandlerProps,
    flashcard?: string | ObjectGenericInitial | ObjectGenericProps<ValueAndValidProps<string>>,
    removeSubCardHandler: GenericProps<string>
}
