import {BookCopyModel} from "@/domain/models/book_copy";

export interface RenewBookCopy {
    execute: (book_copy_id: string) => Promise<BookCopyModel|Error>
}
