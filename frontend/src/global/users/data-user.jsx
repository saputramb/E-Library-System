import * as client from "@/core/http-services/api-service";
import { useState } from "react";
import { createContext } from "react";

export const UserProvider = createContext(null);

export default function DataUser({ children }) {
    const [dataUser, setDataUser] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const getUsers = async () => {
        try {
            const response = client.GET({
                url: '/api/users',
            });
            response.then((res) => {
                setDataUser(res.data);
                setId(res.data[0].id);
                setName(res.data[0].name);
                setRole(res.data[0].role);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return (
        <UserProvider.Provider
            value={{
                dataUser,
                id,
                name,
                role,
                getUsers
            }}
        >
            {children}
        </UserProvider.Provider>
    );
}