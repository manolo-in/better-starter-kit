"use client";

import type React from "react";
import { createContext, useContext } from "react";

import { env } from "@/env";
import type { AuthData, AuthType } from "@/server/context/auth";
import {
	inferAdditionalFields,
	magicLinkClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [magicLinkClient(), inferAdditionalFields<AuthType>()],
	...(env.NEXT_PUBLIC_SERVER_URL
		? { baseURL: env.NEXT_PUBLIC_SERVER_URL }
		: {}),
});

export const { useSession } = authClient;

interface AuthContextType {
	data: AuthData;
	isPending: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { data, isPending } = useSession();

	return (
		<AuthContext.Provider value={{ data, isPending }}>
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
