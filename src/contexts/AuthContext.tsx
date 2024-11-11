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

const demoUsers: Record<string, User> = {
  admin: {
    id: "admin-1",
    name: "Admin Demo",
    email: "admin@eduflow.com",
    phone: "(11) 99999-9999",
    role: "admin" as UserRole,
    createdAt: new Date(),
    photoUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
  },
  teacher: {
    id: "teacher-1",
    name: "Professor Demo",
    email: "professor@eduflow.com",
    phone: "(11) 98888-8888",
    role: "teacher" as UserRole,
    createdAt: new Date(),
    photoUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  student: {
    id: "student-1",
    name: "Aluno Demo",
    email: "aluno@eduflow.com",
    phone: "(11) 97777-7777",
    role: "student" as UserRole,
    createdAt: new Date(),
    photoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userType = localStorage.getItem("user_type");
    if (token && userType && demoUsers[userType]) {
      setUser(demoUsers[userType]);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      let userType = "";
      if (email === "admin@eduflow.com") userType = "admin";
      else if (email === "professor@eduflow.com") userType = "teacher";
      else if (email === "aluno@eduflow.com") userType = "student";
      else throw new Error("Usuário não encontrado");

      const mockUser = demoUsers[userType];
      
      localStorage.setItem("auth_token", "mock_token");
      localStorage.setItem("user_type", userType);
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
    localStorage.removeItem("user_type");
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