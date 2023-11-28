import { HistoryBook } from "../../interfaces";

export const toHistoryBook = (historyBook: any): HistoryBook => {
    return {
        id: historyBook.id,
        book_code: historyBook.book_code,
        book_title: historyBook.book_title,
        author: historyBook.author,
        year_of_book_publication: historyBook.year_of_book_publication,
        book: historyBook.book,
        borrower_id: historyBook.borrower_id,
        borrower: historyBook.borrower,
        date: historyBook.date,
        remarks: historyBook.remarks,
        created_at: historyBook.created_at,
        updated_at: historyBook.updated_at,
    }
}