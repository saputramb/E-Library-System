import { Book } from "../../interfaces";

export const toBook = (book: any): Book => {
    return {
        book_code: book.book_code,
        category: book.category,
        title: book.title,
        author: book.author,
        publication_year: book.publication_year,
        book: book.book,
        created_at: book.created_at,
        updated_at: book.updated_at,
    }
}