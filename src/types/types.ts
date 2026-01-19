export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ProjectType {
    name: string,
    href: string,
    image: string,
    description: string
}
