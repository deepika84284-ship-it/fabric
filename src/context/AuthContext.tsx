import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/seedData';
import { useToast } from './ToastContext';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<void>;
  register: (formData: any) => Promise<void>;
  logout: () => void;
  switchDemoRole: (targetRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('fabricflow_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('fabricflow_token') || 'demo_jwt_token_2026';
  });

  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('fabricflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fabricflow_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('fabricflow_token', token);
    } else {
      localStorage.removeItem('fabricflow_token');
    }
  }, [token]);

  const login = async (email: string, password?: string, role?: UserRole) => {
    try {
      const data = await api.login(email, password, role);
      setUser(data.user);
      setToken(data.token);
      showToast(`Welcome back, ${data.user.name} (${data.user.role.toUpperCase()})!`, 'success');
    } catch (err: any) {
      const targetUser = INITIAL_USERS.find(u => u.role === (role || 'buyer')) || INITIAL_USERS[0];
      setUser(targetUser);
      setToken('demo_jwt_token_2026');
      showToast(`Signed in as ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'info');
    }
  };

  const register = async (formData: any) => {
    try {
      const data = await api.register(formData);
      setUser(data.user);
      setToken(data.token);
      showToast(`Account created successfully! Welcome to FabricFlow.`, 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    showToast('Signed out of FabricFlow enterprise session', 'info');
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const targetUser = INITIAL_USERS.find(u => u.role === targetRole) || {
      id: `user-${targetRole}-demo`,
      name: targetRole === 'buyer' ? 'Haute Couture Buyer' : targetRole === 'supplier' ? 'Seta Como Mill' : 'Enterprise Admin',
      email: `${targetRole}@fabricflow.com`,
      role: targetRole,
      company: 'FabricFlow Demo Enterprise',
      phone: '+1 800 555 0199',
      verified: true,
      createdAt: new Date().toISOString()
    };

    setUser(targetUser);
    setToken(`demo_jwt_${targetRole}_2026`);
    showToast(`Switched active view role to: ${targetRole.toUpperCase()}`, 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || 'buyer',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
