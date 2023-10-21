export interface ListResponse<T> {
    items: T[]
}

export interface GenericProps<Type> {
    (arg: Type): void;
}
