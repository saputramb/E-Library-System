import { Box } from '@mui/material';
import { useState } from 'react'

function DashboardAdmin() {
    const [count, setCount] = useState(0)

    const signIn = async () => {
        // try {
        //     const response = client.post({ url: '/api/sign-in', data: { 'username': 'PowerUser', 'password': '123456' } });
        //     response.then((res) => {
        //         console.log(res.data);
        //     }).catch((error) => {
        //         console.log(error.response.data.message)
        //         console.log(error.response.data.description)
        //     })
        // } catch (error) {
        //     return Promise.reject(error);
        // }
    }

    return (
        <Box>
            {/* <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div> */}
            <h1>Vite + React</h1>
            <h3>Admin</h3>
            <div className="card">
                <button onClick={() => signIn()}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </Box>
    )
}

export default DashboardAdmin;