'use client';
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);

    return (
        <GlobalContext.Provider
            value={{
                unreadCount,
                setUnreadCount,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}