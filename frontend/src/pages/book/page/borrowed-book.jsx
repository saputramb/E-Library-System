import * as client from "@/core/http-services/api-service";
import { useState, useContext } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "@/global/themes/theme";
import Header from '@/global/components/header';
import { useEffect } from 'react';
import ModalAlert from "@/global/components/modal";
import { UserProvider } from "@/global/users/data-user";
import BookView from "@/global/components/book-view";
import { ProtectBook } from "@/global/protect/protected-book";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useLocation } from "react-router-dom";

function BorrowedBook() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id, role, name, getUsers } = useContext(UserProvider);
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [openModalAlert, setOpenModalAlert] = useState(false);
    const handleOpenModalAlert = () => setOpenModalAlert(true);
    const handleCloseModalAlert = () => setOpenModalAlert(false);
    const [dataModal, setDataModal] = useState({
        message: '',
        description: '',
    });
    const [view, setView] = useState('');

    const navigate = useNavigate();

    const getBooksBorrowed = async () => {
        try {
            let query = {};
            (role && role === 'admin')? query = {} : query = {borrower: name}
            const response = client.GET({
                url: '/api/book-borrowed',
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
        getBooksBorrowed();
    }, []);

    const handleView = (prop) => {
        const url = new URL(prop, 'http://localhost:5000/uploads/');
        setView(url.href);
    }

    const borrowBook = async (prop) => {
        try {
            const response = client.POST({
                url: '/api/history-book',
                data: {
                    book_code: prop.book_code,
                    borrower_id: id,
                    remarks: 'RETURNED'
                }
            });
            response.then((res) => {
                setSuccess(true);
                handleOpenModalAlert();
                setDataModal({
                    message: 'Success',
                    description: 'Managed to return the book',
                });
                setTimeout(() => {
                    navigate(0);
                }, 1500);
            }).catch((error) => {
                setSuccess(false);
                handleOpenModalAlert();
                setDataModal({
                    message: error.response.data.message,
                    description: error.response.data.description,
                });
            })
        } catch (error) {
            setSuccess(false);
            handleOpenModalAlert();
            setDataModal({
                message: 'Error',
                description: 'Server internal error',
            });
            return Promise.reject(error);
        }
    }

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
            field: "book",
            headerName: "Book",
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params) => {
                return <Button
                    variant="contained"
                    type="button"
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        fontSize: "14px",
                        fontWeight: "bold",
                        // padding: "10px 20px",
                        borderRadius: '20px',
                        width: '40%',
                        margin: '0 auto',
                        marginTop: '5px',
                        marginBottom: '5px'
                    }}
                    onClick={() => handleView(params.row.book)}
                >
                    Views
                </Button>
            }
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
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params) => {
                if (role && role === 'admin') return <Box />

                return <Button
                    variant="contained"
                    type="button"
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 40px",
                        borderRadius: '20px',
                        width: '40%',
                        margin: '0 auto',
                        marginTop: '5px',
                        marginBottom: '5px'
                    }}
                    onClick={() => borrowBook(params.row)}
                >
                    Returned
                </Button>
            }
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
                    <ModalAlert
                        open={openModalAlert}
                        isSuccess={success}
                        onClose={handleCloseModalAlert}
                        message={dataModal.message}
                        description={dataModal.description}
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

export default BorrowedBook;