export type CreateHistoryBookDTO = {
    id: number;
    book_code: string;
    borrower_id: number;
    date: Date;
    remarks: string;
    created_at: Date;
    updated_at: Date;
}

export type FilterHistoryBookDTO = {
    book_code?: boolean
    borrower?: boolean;
}