import { useTheme } from "@emotion/react";
import { Box, TextField, Typography } from "@mui/material";
import { tokens } from "../themes/theme";

export default function CustomeTextField({
    label,
    name,
    placeholder,
    type,
    value,
    multiline,
    rows,
    onChange,
    onBlur,
    error,
    helper,
}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Typography
                variant="h4"
                color={colors.grey[100]}
                textAlign={'left'}
            >
                {label}
            </Typography>
            <Box height={'5px'} />
            <TextField
                fullWidth
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                multiline={multiline}
                rows={rows}
                onChange={onChange}
                onBlur={onBlur}
                variant="outlined"
                error={error}
                helperText={helper}
                sx={{
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                    },
                }}
                InputProps={{
                    style: {
                        borderRadius: "20px",
                        backgroundColor: 'white',
                        color: 'black'
                    }
                }}
            />
        </>
    );
}