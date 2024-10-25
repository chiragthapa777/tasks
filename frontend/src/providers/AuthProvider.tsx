import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { userType } from "../types/user.type";

export type AuthContextType = {
  user: userType | null;
  logout: () => void;
  setAuthUser: (user: userType, accessToken: string) => void;
  loading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  logout: () => {},
  setAuthUser: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode<userType>(accessToken);
        setUser(decoded);
      } catch (error) {}
    }
    setLoading(false);
  };

  const logout = (): void => {
    localStorage.setItem("accessToken", "");
    setUser(null);
  };

  const setAuthUser = (user: userType, accessToken: string) => {
    setUser(user);
    localStorage.setItem("accessToken", accessToken);
  };

  return (
    <AuthContext.Provider value={{ logout, user, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const data = useContext(AuthContext);
  if (!data) throw new Error("AuthProvider should be wrapper around the app");
  return data;
};
