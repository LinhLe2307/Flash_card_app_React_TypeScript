export interface ListResponse<T> {
    items: T[]
}

export interface GenericProps<Type> {
    (arg: Type): void;
}

export type AddNewProperty<T> = {
    [K in keyof T]: T[K]
}
