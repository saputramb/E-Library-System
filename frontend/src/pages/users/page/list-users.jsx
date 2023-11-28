import * as client from "@/core/http-services/api-service";
import { useState, useContext } from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "@/global/themes/theme";
import Header from '@/global/components/header';
import { useEffect } from 'react';

function ListUsers() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    const getUsers = async () => {
        try {
            const response = client.GET({
                url: '/api/users/',
                params: {
                    users: 'show all'
                }
            });
            response.then((res) => {
                const a = res.data.filter((e) => e.role == 'user');

                const range = [...Array(a.length).keys()];
                const b = a.map((item, index) => {
                    const obj = {
                        ...item,
                        no: range[index] + 1,
                        created_at: new Date(item.created_at).toLocaleString('en-EN', { day: '2-digit', month: 'long', year: 'numeric' })
                    }
                    return obj;
                });
                setData(b);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            field: "no",
            headerName: "No.",
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            // flex: 1,
        },
        {
            field: "gender",
            headerName: "Gender",
            headerAlign: "left",
            align: "left",
            // flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "address",
            headerName: "Address",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "created_at",
            headerName: "Date Created",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
    ];

    return (
        <Box m="20px">
            <Header
                title={'Users Data'}
                alignTitle='left'
                subtitle={'E-Library System users data'}
                alignSubtitle='left'
            />
            <Box height={'20px'} />
            <DataGrid
                rows={data}
                columns={columns}
                autoHeight
                disableColumnMenu
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
            />
        </Box >
    )
}

export default ListUsers;