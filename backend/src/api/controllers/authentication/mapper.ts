import { Authentication } from "../../interfaces";

export const toAuthentication = (authentication: any): Authentication => {
    return {
        id: authentication.id,
        name: authentication.name,
        email: authentication.email,
        phone: authentication.phone,
        gender: authentication.gender,
        address: authentication.address,
        role: authentication.role,
        password: authentication.password,
        refresh_token: authentication.refresh_token,
        created_at: authentication.created_at,
        updated_at: authentication.updated_at,
    }
}