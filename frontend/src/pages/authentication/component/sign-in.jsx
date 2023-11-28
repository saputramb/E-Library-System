import * as client from "@/core/http-services/api-service";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../page/authentication";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "@/global/themes/theme";
import { Media } from "@/global/media/media-query";
import Header from "@/global/components/header";
import CustomeTextField from "@/global/components/custom-textfield";
import { useLocation } from "react-router-dom";
import { AuthProvider, path } from "@/routes/routers";
import ModalAlert from "@/global/components/modal";

function SignIn() {
    const { toggle, setToggle } = useContext(Context);
    const { setIsLogin } = useContext(AuthProvider);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const matches = useContext(Media).matches;
    const windowSize = useContext(Media).windowSize;
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
    const from = location.state?.from?.pathname || path.dashboard;

    const handleToggle = () => {
        setToggle(true);
        if (!toggle) {
            localStorage.setItem('toggle', true);
        } else {
            localStorage.setItem('toggle', false);
        }
    }

    const signIn = async () => {
        try {
            setLoading(true);
            const response = client.POST({
                url: '/api/sign-in',
                data: {
                    'email': formik.values.email,
                    'password': formik.values.password,
                },
            });
            response.then((res) => {
                localStorage.setItem('token', res.data);
                setLoading(false);
                setSuccess(true);
                handleOpenModalAlert();
                setDataModal({
                    message: res.status,
                    description: res.message,
                });
                setTimeout(() => {
                    setIsLogin(true);
                    formik.resetForm();
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

    const handleOnChange = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().required("Please enter email").email("Invalid email"),
            password: yup.string()
                .required("Please enter password")
            // .min(8, "Pasword must be 8 characters")
            // .max(8, "Pasword must be 8 characters")
            // .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            // .matches(/^0|[1-9]\d*$/, "Password must not contain special characters")
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: signIn
    });

    return (
        <Box
            width={matches ? '35rem' : windowSize.innerWidth}
            sx={{
                backgroundColor:
                    colors.primary[400]
            }}
            height={'auto'}
            display={'flex'}
            p={'2rem'}
            borderRadius={'20px'}
            flexDirection={'column'}
        >
            <Header
                padding="40px"
                title={'SIGN IN'}
                subtitle={'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt modi rem, autem exercitationem molestiae culpa aliquam itaque suscipit sit possimus at adipisci! Rem vero sint, commodi hic asperiores molestias earum.'}
            />
            <Box height={'40px'} />
            <Box
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <CustomeTextField
                        label={"Email"}
                        name="email"
                        placeholder={'Enter email'}
                        type="text"
                        value={formik.values.email}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.email}
                        </Typography>
                    ) : null}
                    <Box height={'20px'} />
                    <CustomeTextField
                        label={"Password"}
                        name="password"
                        placeholder={'Enter password'}
                        type="password"
                        value={formik.values.password}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.password}
                        </Typography>
                    ) : null}
                    <Box height={'40px'} />
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            borderRadius: '20px',
                            width: '40%',
                            margin: '0 auto'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Please wait ...' : 'Sign In'}
                    </Button>
                    <Box height={'10px'} />
                    <Link onClick={handleToggle}>
                        <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            textAlign={'center'}
                        >
                            <u>Create account?</u>
                        </Typography>
                    </Link>
                </Box>
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

export default SignIn;