import * as client from "@/core/http-services/api-service";
import { useState, useContext } from 'react'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "@/global/themes/theme";
import Header from '@/global/components/header';
import { useEffect } from 'react';
import { UserProvider } from "@/global/users/data-user";
import BookView from "@/global/components/book-view";
import { ProtectBook } from "@/global/protect/protected-book";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

function BookHistories() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { role, name, getUsers } = useContext(UserProvider);
    const [data, setData] = useState([]);
    const [view, setView] = useState('');

    const getBookHistories = async () => {
        try {
            let query = {};
            (role && role === 'admin') ? query = {} : query = { borrower: name }
            const response = client.GET({
                url: '/api/history-book',
                params: query
            });
            response.then((res) => {
                const a = res.data;

                const range = [...Array(a.length).keys()];
                const b = a.map((item, index) => {
                    const obj = {
                        ...item,
                        no: range[index] + 1,
                        date: new Date(item.date).toLocaleString('en-EN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
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
        getBookHistories();
    }, []);

    const columns = [
        {
            field: "no",
            headerName: "No.",
        },
        {
            field: "book_code",
            headerName: "Book Code",
            flex: 2,
        },
        {
            field: "book_title",
            headerName: "Book Title",
        },
        {
            field: "author",
            headerName: "Author",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "year_of_book_publication",
            headerName: "Publication Year",
            // headerAlign: "left",
            // align: "left",
            flex: 1
        },
        {
            field: "borrower",
            headerName: "Borrower",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "date",
            headerName: "Borrowing Date",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "remarks",
            headerName: "Status",
            headerAlign: "left",
            align: "left",
        },
    ];

    return (
        <>
            {!view ?
                <Box m="20px">
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Header
                            title={'Book List'}
                            alignTitle='left'
                            subtitle={'E-Library System book list'}
                            alignSubtitle='left'
                        />
                    </Box>
                    <Box height={'20px'} />
                    <DataGrid
                        rows={data}
                        columns={columns}
                        autoHeight
                        disableColumnMenu
                        disableRowSelectionOnClick
                        getRowHeight={() => 'auto'}
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                                textOverflow: "clip",
                                whiteSpace: "break-spaces",
                                lineHeight: 1
                            }
                        }}
                    />
                </Box >
                : <Box m={'20px'}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                        >
                            <IconButton onClick={() => setView('')}>
                                <ArrowBackIos fontSize="large" />
                            </IconButton>
                            <Typography
                                variant="h3"
                                fontWeight={'bold'}
                                color={colors.grey[500]}
                            >
                                Back
                            </Typography>
                        </Box>
                        <Box height={'20px'} />
                        <ProtectBook.Provider
                            value={{ view }}
                        >
                            <BookView />
                        </ProtectBook.Provider>
                    </Box>
                </Box>
            }
        </>
    )
}

export default BookHistories;