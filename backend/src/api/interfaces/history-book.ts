export interface HistoryBook {
    id: number;
    book_code: string;
    book_title: string;
    author: string;
    year_of_book_publication: string;
    book: string;
    borrower_id: number;
    borrower: string;
    date: Date;
    remarks: string;
    created_at: Date;
    updated_at: Date;
}