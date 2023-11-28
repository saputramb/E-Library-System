import { Box } from '@mui/material';
import { useState } from 'react'
import DashboardAdmin from '../component/dashboard-admin';
import { UserProvider } from '@/global/users/data-user';
import { useEffect } from 'react';
import DashboardUser from '../component/dashboard-user';
import { useContext } from 'react';

function Dashboard() {
    const { role, getUsers } = useContext(UserProvider);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box>
            {role && role === 'admin' ?
                <DashboardAdmin />
                : <DashboardUser />
            }
        </Box>
    )
}

export default Dashboard;