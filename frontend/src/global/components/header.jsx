import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";

export default function Header({
  title,
  subtitle,
  alignTitle = 'center',
  alignSubtitle = 'center',
  padding = '0px'
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
        textAlign={alignTitle}
      >
        {title}
      </Typography>
      {subtitle ?
        <>
          <Box height={padding} />
          <Typography
            variant="h6"
            color={colors.greenAccent[400]}
            textAlign={alignSubtitle}
          >
            {subtitle}
          </Typography>
        </> : null
      }
    </Box>
  );
};
