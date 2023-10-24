import { InputHandlerProps } from "../../shared/types/formTypes"
import { GenericProps, ListResponse, ObjectGenericProps } from "../../shared/types/sharedTypes"

export interface CardItemProps {
    id: string
    card: ObjectGenericProps<string>,
    onDelete: (deletedCardId: string) => void
}

export interface TermFlashcardProps {
    cardId: string, 
    inputHandler: InputHandlerProps,
    flashcard?: ObjectGenericProps<string>,
    removeSubCardHandler: GenericProps<string>
}

export interface CardListProps {
    items: ObjectGenericProps<string>[],
    onDeleteCard: (deletedCardId: string) => void
}