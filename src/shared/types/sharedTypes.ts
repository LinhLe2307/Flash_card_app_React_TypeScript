export interface ListResponse<T> {
    items: T[]
}

export interface GenericProps<Type> {
    (arg: Type): void;
}

export type AddNewProperty<T> = {
    [K in keyof T]: string
}

export interface ObjectGenericProps<T> {
    [key: string]: T
}

export interface SendRequestProps {
    (
      url: string,
      method: string,
      body: BodyInit | null | undefined,
      headers: ObjectGenericProps<string>
    ) : any
  }