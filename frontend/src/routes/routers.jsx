import { SideBar } from "@/global/components/side-bar";
import { TopBar } from "@/global/components/top-bar";
import MediaQuery from "@/global/media/media-query";
import ProtectedRoute from "@/global/protect/protected-route";
import RequireAuth from "@/global/protect/require-auth";
import { ColorModeContext, useMode } from "@/global/themes/theme";
import DataUser from "@/global/users/data-user";
import { Authentication, Book, BookHistories, BorrowedBook, Dashboard, ListAdmin, ListUsers } from "@/pages";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext } from "react";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Navigate } from "react-router-dom";

export const AuthProvider = createContext(null);

export const path = {
    root: '/',
    dashboard: '/dashboard',
    listUsers: '/list-users',
    listAdmin: '/list-admin',
    bookList: '/book-list',
    borrowedBook: '/borrowed-book',
    bookHistories: '/book-histories',
}

function Routers() {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token') || false);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <Router>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <MediaQuery>
                            <AuthProvider.Provider
                                value={{
                                    isLogin,
                                    setIsLogin,
                                    path: path
                                }}
                            >
                                {isLogin ?
                                    <DataUser>
                                        <SideBar isSidebar={isSidebar} />
                                    </DataUser>
                                    : null
                                }
                                <main className="content">

                                    {isLogin ?
                                        <DataUser>
                                            <TopBar setIsSidebar={setIsSidebar} />
                                        </DataUser>
                                        : null
                                    }
                                    <Routes>
                                        <Route path={path.root} element={
                                            !isLogin ?
                                                <Authentication />
                                                : <Navigate to={path.dashboard} state={{ from: path.root }} replace />
                                        }
                                        />
                                        <Route path={path.dashboard} element={
                                            <RequireAuth>
                                                <DataUser>
                                                    <Dashboard />
                                                </DataUser>
                                            </RequireAuth>
                                        } />
                                        <Route path={path.listUsers} element={
                                            <RequireAuth>
                                                <DataUser>
                                                    <ProtectedRoute>
                                                        <ListUsers />
                                                    </ProtectedRoute>
                                                </DataUser>
                                            </RequireAuth>
                                        }
                                        />
                                        <Route path={path.listAdmin} element={
                                            <RequireAuth>
                                                <DataUser>
                                                    <ProtectedRoute>
                                                        <ListAdmin />
                                                    </ProtectedRoute>
                                                </DataUser>
                                            </RequireAuth>
                                        }
                                        />
                                        <Route path={path.bookList} element={
                                            <RequireAuth>
                                                <DataUser>
                                                    <Book />
                                                </DataUser>
                                            </RequireAuth>
                                        }
                                        />
                                        <Route path={path.borrowedBook} element={
                                            <RequireAuth>
                                                <DataUser>
                                                    <BorrowedBook />
                                                </DataUser>
                                            </RequireAuth>
                                        }
                                        />
                                        <Route path={path.bookHistories} element={
                                            <RequireAuth>
                                                <DataUser>
                                                    <BookHistories />
                                                </DataUser>
                                            </RequireAuth>
                                        }
                                        />
                                    </Routes>
                                </main>
                            </AuthProvider.Provider>
                        </MediaQuery>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Router>
    );
};

export default Routers;