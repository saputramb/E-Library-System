import { useMediaQuery } from "@mui/material";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function WindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

export const Media = createContext(null);

export default function MediaQuery({ children }) {
    const matches = useMediaQuery('(min-width:600px)');
    const [windowSize, setWindowSize] = useState(WindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(WindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Media.Provider
            value={{
                matches,
                windowSize,
            }}
        >
            {children}
        </Media.Provider>
    );
}
