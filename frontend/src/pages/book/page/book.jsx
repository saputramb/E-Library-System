import * as client from "@/core/http-services/api-service";
import { useState, useContext } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "@/global/themes/theme";
import Header from '@/global/components/header';
import { useEffect } from 'react';
import CustomeTextField from "@/global/components/custom-textfield";
import ModalAlert from "@/global/components/modal";
import { useRef } from "react";
import { UserProvider } from "@/global/users/data-user";
import { createContext } from "react";
import BookView from "@/global/components/book-view";
import { ProtectBook } from "@/global/protect/protected-book";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

function BookList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id, role, getUsers } = useContext(UserProvider);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openModalAlert, setOpenModalAlert] = useState(false);
    const handleOpenModalAlert = () => setOpenModalAlert(true);
    const handleCloseModalAlert = () => setOpenModalAlert(false);
    const [dataModal, setDataModal] = useState({
        message: '',
        description: '',
    });
    const [form, setForm] = useState({
        category: '',
        title: '',
        author: '',
        publication_year: '',
        book: '',
    });
    const [fileName, setFileName] = useState('');
    const [view, setView] = useState('');

    const handleReset = () => {
        setForm({
            category: '',
            title: '',
            author: '',
            publication_year: '',
            book: null,
        });
    }

    const handleShow = () => {
        handleReset();
        setShow(!show);
    }

    const handleImportFile = (event) => {
        hiddenFileInput.current.value = null;
        hiddenFileInput.current.click();
    };

    const hiddenFileInput = useRef(null);

    const getBook = async () => {
        try {
            const response = client.GET({
                url: '/api/book',
            });
            response.then((res) => {
                const a = res.data;

                const range = [...Array(a.length).keys()];
                const b = a.map((item, index) => {
                    const obj = {
                        ...item,
                        no: range[index] + 1,
                        id: range[index] + 1,
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
        getBook();
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
                    remarks: 'BORROWED'
                }
            });
            response.then((res) => {
                setSuccess(true);
                handleOpenModalAlert();
                setDataModal({
                    message: 'Success',
                    description: 'Managed to borrow a book',
                });
                setTimeout(() => {
                    // handleShow();
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
            // flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 2,
        },
        {
            field: "author",
            headerName: "Author",
            headerAlign: "left",
            align: "left",
            flex: 2,
        },
        {
            field: "publication_year",
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
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                if (role && role === 'admin') {
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
                } else {
                    return <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            fontSize: "14px",
                            fontWeight: "bold",
                            // padding: "10px 20px",
                            borderRadius: '20px',
                            width: 'auto',
                            margin: '0 auto',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                        onClick={() => borrowBook(params.row)}
                    >
                        Borrow
                    </Button>
                }
            }
        },
    ];

    const postBook = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('category', form.category);
            formData.append('title', form.title);
            formData.append('author', form.author);
            formData.append('publication_year', form.publication_year);
            formData.append('book', form.book);
            const response = client.POST({
                url: '/api/book',
                data: formData
            });
            response.then((res) => {
                setLoading(false);
                setSuccess(true);
                handleOpenModalAlert();
                setDataModal({
                    message: res.status,
                    description: res.message,
                });
                setTimeout(() => {
                    handleShow();
                }, 1500);
            }).catch((error) => {
                setLoading(false);
                setSuccess(false);
                handleOpenModalAlert();
                setDataModal({
                    message: error.response.data.message,
                    description: error.response.data.description,
                });
            })
        } catch (error) {
            setLoading(false);
            setSuccess(false);
            handleOpenModalAlert();
            setDataModal({
                message: 'Error',
                description: 'Server internal error',
            });
            return Promise.reject(error);
        }
    }

    const handleOnChange = (event) => {
        const { target } = event;
        if (target.name === 'book') {
            console.log(target.files[0].name);
            setFileName(target.files[0].name);
            setForm({
                ...form,
                [target.name]: target.files[0].name
            });
        }

        setForm({
            ...form,
            [target.name]: target.value
        });
    };

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
                        {role && role === 'admin' ?
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    fontWeight: "bold",
                                    borderRadius: '20px',
                                }}
                                disabled={loading}
                                onClick={handleShow}
                            >
                                Add Book
                            </Button>
                            : <Box />
                        }
                    </Box>
                    <Box height={'20px'} />
                    {show &&
                        <Box
                            width={'100%'}
                            display={'flex'}
                            flexDirection={'column'}
                        >
                            <CustomeTextField
                                label={"Category"}
                                name="category"
                                placeholder={'Enter Category'}
                                type="text"
                                value={form.category}
                                onChange={handleOnChange}
                            />
                            <Box height={'20px'} />
                            <CustomeTextField
                                label={"Title"}
                                name="title"
                                placeholder={'Enter title'}
                                type="text"
                                value={form.title}
                                onChange={handleOnChange}
                            />
                            <Box height={'20px'} />
                            <CustomeTextField
                                label={"Author"}
                                name="author"
                                placeholder={'Enter author'}
                                type="text"
                                value={form.author}
                                onChange={handleOnChange}
                            />
                            <Box height={'20px'} />
                            <CustomeTextField
                                label={"Publication Year"}
                                name="publication_year"
                                placeholder={'Enter publication year'}
                                type="number"
                                value={form.publication_year}
                                onChange={handleOnChange}
                            />
                            <Box height={'20px'} />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    backgroundColor: colors.greenAccent[700],
                                    fontWeight: "bold",
                                    borderRadius: '20px',
                                }}
                                disabled={loading}
                                onClick={handleImportFile}
                            >
                                <input
                                    ref={hiddenFileInput}
                                    onChange={handleOnChange}
                                    name="book"
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept=".pdf"
                                />
                                {form.book ? fileName : 'Upload Book'}
                            </Button>
                            <Box height={'40px'} />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    fontWeight: "bold",
                                    borderRadius: '20px',
                                }}
                                disabled={loading}
                                onClick={postBook}
                            >
                                {loading ? 'Please wait ...' : 'Submit'}
                            </Button>
                        </Box>
                    }
                    <Box height={'20px'} />
                    <DataGrid
                        rows={data}
                        columns={columns}
                        autoHeight
                        disableColumnMenu
                        disableRowSelectionOnClick
                        getRowHeight={() => 'auto'}
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

export default BookList;