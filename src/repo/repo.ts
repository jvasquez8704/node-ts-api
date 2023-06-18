export default interface IRepo<T> {
    /* findOne(filter: Record<string, any>): Promise<T>
    fetch(filter: Record<string, any>): Promise<T[]>
    create(entries: T[], filter: Record<string, any>): Promise<T[]>
    update(entry: T, filter: Record<string, any>): Promise<void>
    detele(filter: Record<string, any>): Promise<void> */
    findOne(filter: any): Promise<T>
    fetch(filter: any): Promise<T[]>
    create(entries: T[]): Promise<T[]>
    update(entry: T, filter: any): Promise<void>
    detele(filter: any): Promise<void>
}