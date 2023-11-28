export interface Authentication {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    role: string;
    password: string;
    refresh_token?: string;
    created_at: Date;
    updated_at: Date;
}