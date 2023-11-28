import { Users } from "../../interfaces";

export const toUser = (user: any): Users => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
}