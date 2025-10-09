"use client";

import type React from "react";
import { createContext, useContext } from "react";

import { authConfig } from "@/lib/auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient(authConfig);

export const { useSession } = authClient;

type AuthContextType = Pick<ReturnType<typeof useSession>, "data" | "isPending">

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useSession()

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
