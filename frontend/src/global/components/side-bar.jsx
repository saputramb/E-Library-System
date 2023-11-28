import { tokens } from "@/global/themes/theme";
import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useContext } from "react";
import { UserProvider } from "../users/data-user";
import { useEffect } from "react";
import { path } from "@/routes/routers";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            component={selected !== title ? <Link to={to} /> : null}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

export const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { role, getUsers } = useContext(UserProvider);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: colors.primary[400],
            }}
        >
            <Sidebar collapsed={isCollapsed}>
                <Menu
                    iconShape="square" style={{
                        backgroundColor: colors.primary[400],
                        padding: "10px 0 20px 0",
                        height: '100vh',
                    }}
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0)
                                return {
                                    borderTopLeftRadius: '20px',
                                    borderBottomLeftRadius: '20px',
                                    backgroundColor: theme.palette.mode !== 'dark' ? active ? colors.primary[900] : undefined : active ? colors.primary[500] : undefined,
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode !== 'dark' ? !active ? colors.primary[800] : colors.grey[900] : !active ? colors.primary[300] : colors.primary[500],
                                        cursor: !active ? 'pointer' : 'default'
                                    },
                                };
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            backgroundColor: colors.primary[400]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    color: colors.grey[100],
                                }}
                            >
                                <Typography variant="h3">
                                    E-Library System
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon fontSize="medium" />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>

                        <Item
                            title="Dashboard"
                            to={path.dashboard}
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {role && role === 'admin' ?
                            <>
                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Data
                                </Typography>

                                <Item
                                    title="Admin"
                                    to={path.listAdmin}
                                    icon={<AdminPanelSettingsOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Item
                                    title="Users"
                                    to={path.listUsers}
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                            : null}

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Books
                        </Typography>

                        <Item
                            title="Book List"
                            to={path.bookList}
                            icon={<LibraryBooksIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Book Histories"
                            to={path.bookHistories}
                            icon={<MenuBookIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Borrowed Book"
                            to={path.borrowedBook}
                            icon={<LocalLibraryIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box >
    );
}