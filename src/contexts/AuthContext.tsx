import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de token
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Simular usuário logado
      setUser({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "student",
        createdAt: new Date(),
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simular login
      const mockUser = {
        id: "1",
        name: "John Doe",
        email,
        role: "student" as UserRole,
        createdAt: new Date(),
      };
      
      localStorage.setItem("auth_token", "mock_token");
      setUser(mockUser);
      toast({
        title: "Login realizado com sucesso!",
        description: getGreeting(mockUser.name),
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const getGreeting = (name: string) => {
  const hour = new Date().getHours();
  if (hour < 12) return `Bom dia, ${name}!`;
  if (hour < 18) return `Boa tarde, ${name}!`;
  return `Boa noite, ${name}!`;
};