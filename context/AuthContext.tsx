"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<IUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedToken) setTokenState(storedToken);
    setIsLoading(false);
  }, []);

  const setUser = useCallback((user: IUser | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  const setToken = useCallback((token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lastActivity");
    router.push("/");
  }, [setUser, setToken, router]);

  // Session timeout logic
  useEffect(() => {
    // Only track activity if user is logged in (has token)
    if (!token) return;

    // 24 hours in milliseconds
    const TIMEOUT_MS = 24 * 60 * 60 * 1000;

    const updateActivity = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("lastActivity", Date.now().toString());
      }
    };

    // Initialize lastActivity if it doesn't exist
    if (!localStorage.getItem("lastActivity")) {
      updateActivity();
    }

    const checkInactivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity) {
        const now = Date.now();
        if (now - parseInt(lastActivity) > TIMEOUT_MS) {
          logout();
        }
      }
    };

    // Check every minute
    const intervalId = setInterval(checkInactivity, 60000);

    // Events that constitute activity
    // Excluded mousemove to avoid excessive writes/performance impact,
    // assuming mousedown covers most active mouse usage.
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handleActivity = () => updateActivity();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      clearInterval(intervalId);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, isLoading, logout }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
