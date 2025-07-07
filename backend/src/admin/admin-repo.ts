export default interface AdminRepo<T> {
    save(admin: T): Promise<void>
    get(_id: string): Promise<T>
}