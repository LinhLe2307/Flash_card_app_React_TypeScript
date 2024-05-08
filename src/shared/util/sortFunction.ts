import { ObjectGenericProps } from '../types/sharedTypes'

export const sortFunction = (a:  ObjectGenericProps<ObjectGenericProps<string>>, b: ObjectGenericProps<ObjectGenericProps<string>>) => {
    a.name.common.localeCompare(b.name.common);
}