import { IconButton, Box, Typography } from "@mui/material";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from '@emotion/react';
import { ColorModeContext, tokens } from '../themes/theme';
import { useContext } from 'react';
import * as client from "@/core/http-services/api-service";
import { useState } from "react";
import { AuthProvider, path } from "@/routes/routers";
import { useNavigate, useLocation } from "react-router-dom";
import ModalAlert from "./modal";
import { useEffect } from "react";
import { UserProvider } from "../users/data-user";

export const TopBar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const colors = tokens(theme.palette.mode);
    const { setIsLogin } = useContext(AuthProvider);
    const { name, getUsers } = useContext(UserProvider);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openModalAlert, setOpenModalAlert] = useState(false);
    const handleOpenModalAlert = () => setOpenModalAlert(true);
    const handleCloseModalAlert = () => setOpenModalAlert(false);
    const [dataModal, setDataModal] = useState({
        message: '',
        description: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || path.root;

    const changeTheme = () => {
        colorMode.toggleColorMode();
        if (theme.palette.mode === 'dark') {
            localStorage.setItem('mode', 'light');
        } else {
            localStorage.setItem('mode', 'dark');
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const signOut = async () => {
        try {
            setLoading(true);
            const response = client.DELETE({
                url: '/api/sign-out',
            });
            response.then((res) => {
                localStorage.removeItem('token');
                setLoading(false);
                setSuccess(true);
                handleOpenModalAlert();
                setDataModal({
                    message: res.status,
                    description: res.message,
                });
                setTimeout(() => {
                    setIsLogin(false);
                    navigate(from, { replace: true });
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

    return (
        <Box display={"flex"} justifyContent={"end"} p={2}>
            <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
            >
                <Typography
                    variant="h4"
                    color={colors.grey[100]}
                >
                    {name}
                </Typography>
                <Box width={'10px'} />
                <IconButton onClick={changeTheme}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon fontSize={"large"} />
                    ) : (
                        <LightModeOutlinedIcon fontSize={"large"} />
                    )}
                </IconButton>
                <IconButton onClick={signOut} disabled={loading}>
                    <LoginOutlined fontSize={"large"} />
                </IconButton>
            </Box>
            <ModalAlert
                open={openModalAlert}
                isSuccess={success}
                onClose={handleCloseModalAlert}
                message={dataModal.message}
                description={dataModal.description}
            />
        </Box>
    );
}