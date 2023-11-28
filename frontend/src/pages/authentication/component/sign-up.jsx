import * as client from "@/core/http-services/api-service";
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
import ModalAlert from "@/global/components/modal";
import CustomeDropdown from "@/global/components/custom-dropdown";

function SignUp() {
    const { toggle, setToggle } = useContext(Context);
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

    const handleToggle = () => {
        setToggle(false);
        if (!toggle) {
            localStorage.setItem('toggle', true);
        } else {
            localStorage.setItem('toggle', false);
        }
    }

    const signUp = async () => {
        try {
            setLoading(true);
            const response = client.POST({
                url: '/api/sign-up',
                data: {
                    'name': formik.values.name,
                    'email': formik.values.email,
                    'phone': formik.values.phone,
                    'gender': formik.values.gender,
                    'address': formik.values.address,
                    'role': 'user',
                    'password': formik.values.password,
                },
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
                    formik.resetForm();
                    handleToggle();
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
            name: '',
            email: '',
            phone: '',
            gender: 'Select gender',
            password: '',
            confirmPassword: '',
            address: '',
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Please enter full name"),
            email: yup.string().required("Please enter email").email("Invalid email"),
            phone: yup.number().required("Please enter phone number"),
            gender: yup.string().test('gender', 'Please enter gender', (value) => {
                return value !== 'Select gender';
            }),
            password: yup.string().required("Please enter password")
                .min(8, "Pasword must be 8 characters")
                .max(8, "Pasword must be 8 characters")
                .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
                .matches(/^0|[1-9]\d*$/, "Password must not contain special characters"),
            confirmPassword: yup.string().required("Please enter confirm password")
                .oneOf([yup.ref('password'), null], "Passwords must match"),
            address: yup.string().required("Please enter address"),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: signUp
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
                title={'SIGN UP'}
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
                        label={"Full Name"}
                        name="name"
                        placeholder={'Enter name'}
                        type="text"
                        value={formik.values.name}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.name}
                        </Typography>
                    ) : null}
                    <Box height={'20px'} />
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
                        label={"Phone"}
                        name="phone"
                        placeholder={'Enter phone'}
                        type="number"
                        value={formik.values.phone}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.phone && !!formik.errors.phone}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.phone}
                        </Typography>
                    ) : null}
                    <Box height={'20px'} />
                    <CustomeDropdown
                        label={"Gender"}
                        name="gender"
                        placeholder={'Enter gender'}
                        value={formik.values.gender}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.gender && !!formik.errors.gender}
                        item={['Select gender', 'Male', 'Female']}
                    />
                    {formik.touched.gender && formik.errors.gender ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.gender}
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
                    <Box height={'20px'} />
                    <CustomeTextField
                        label={"Confirm Password"}
                        name="confirmPassword"
                        placeholder={'Enter confirm password'}
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.confirmPassword}
                        </Typography>
                    ) : null}
                    <Box height={'20px'} />
                    <CustomeTextField
                        label={"Address"}
                        name="address"
                        placeholder={'Enter address'}
                        type="text"
                        value={formik.values.address}
                        multiline
                        rows={3}
                        onChange={handleOnChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.touched.address && !!formik.errors.address}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <Typography
                            variant="h6"
                            color={colors.redAccent[500]}
                        >
                            {formik.errors.address}
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
                        {loading ? 'Please wait ...' : 'Sign Up'}
                    </Button>
                    <Box height={'10px'} />
                    <Link onClick={handleToggle}>
                        <Typography
                            variant="h6"
                            color={colors.grey[100]}
                            textAlign={'center'}
                        >
                            <u>Sign In</u>
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

export default SignUp;