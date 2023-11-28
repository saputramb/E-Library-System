export type CreateBookDTO = {
    book_code: string;
    category: string;
    title: string;
    author: string;
    publication_year: string;
    book: string;
    created_at: Date;
    updated_at: Date;
}

export type FilterBookDTO = {
    book_code?: boolean
}