import { createContext, useContext, ReactNode, useEffect } from "react";
import { useGetMe, User } from "@/lib/api-client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  refetchUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useGetMe({
    query: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <AuthContext.Provider 
      value={{ 
        user: user || null, 
        isLoading, 
        isAuthenticated: !!user,
        refetchUser: refetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
