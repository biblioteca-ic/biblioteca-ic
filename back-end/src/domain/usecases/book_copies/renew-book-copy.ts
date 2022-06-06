export interface RenewBookCopy {
    execute: (book_copy_id: string) => Promise<void | Error>
}
