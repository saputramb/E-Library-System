import { Box } from "@mui/material";
import { createContext } from "react";
import { useState } from "react";
import SignIn from "../component/sign-in";
import SignUp from "../component/sign-up";
import { useEffect } from "react";

export const Context = createContext(null);

function Authentication() {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('toggle') !== null) {
            setToggle(localStorage.getItem('toggle').toLowerCase() === 'true');
        }
    }, []);

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            position={'absolute'}
            top={!toggle? '50%' : '0%'}
            left={!toggle? '50%' : '50%'}
            sx={{
                transform: !toggle ? 'translate(-50%, -50%)' : 'translate(-50%, 0%)'
            }}
        >
            <Context.Provider value={{ toggle, setToggle }}>
                {!toggle ?
                    <SignIn /> :
                    <SignUp />
                }
            </Context.Provider>
        </Box>
    )
}

export default Authentication;