import { useTheme } from "@emotion/react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { tokens } from "../themes/theme";

export default function CustomeDropdown({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    item
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
            <Select
                fullWidth
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                variant="outlined"
                error={error}
                inputProps={{
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                backgroundColor: 'white'
                            }
                        }
                    }
                }}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    color: 'black',
                    '.MuiSelect-icon': {
                        color: "black",
                    },
                }}
            >
                {item.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                                color: 'black',
                            },
                            '&:focus-visible': {
                                backgroundColor: '#e0e0e0',
                                color: 'black',
                            },
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
