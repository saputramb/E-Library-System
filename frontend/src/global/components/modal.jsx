import { useTheme } from "@emotion/react";
import { tokens } from "../themes/theme";
import { Box, Modal, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { HighlightOffOutlined } from "@mui/icons-material";

export default function ModalAlert({ open, onClose, message, description, isSuccess }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    color: colors.grey[100],
                    borderRadius: '20px',
                    backgroundColor: colors.primary[400],
                    transform: "translate(-50%, -50%)",
                }}
                p={'3%'}
                display={'flex'}
                position={'absolute'}
                top={'50%'}
                left={'50%'}
                textAlign={'center'}
                flexDirection={'column'}
            >
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    color={isSuccess ? colors.greenAccent[500] : colors.redAccent[500]}
                >
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                    >
                        {message}
                    </Typography>
                    <Box width={'10px'} />
                    {isSuccess ?
                        <CheckCircleOutline fontSize="large" />
                        : <HighlightOffOutlined fontSize="large" />
                    }
                </Box>
                <Box height={'10px'} />
                <Typography
                    variant="h4"
                >
                    {description}
                </Typography>
            </Box>
        </Modal>
    );
}