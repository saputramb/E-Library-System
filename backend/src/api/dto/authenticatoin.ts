import { Optional } from "sequelize"

export type CreateAuthenticationDTO = {
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

export type UpdateAuthenticationDTO = Optional<CreateAuthenticationDTO, 'refresh_token'>

export type FilterAuthenticationDTO = {
    email?: boolean
    refresh_token?: boolean
}