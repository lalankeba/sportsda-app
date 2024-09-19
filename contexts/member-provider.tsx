"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Member from '@/interfaces/i-member';

const STORAGE_KEY_MEMBER = "member";
const STORAGE_KEY_TOKEN = "token";

interface MemberContextType {
  member: Member | null;
  token: string | null;
  setMember: (member: Member | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const MemberContext = createContext<MemberContextType | undefined>(undefined);

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedMember = localStorage.getItem(STORAGE_KEY_MEMBER);
    const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN);

    if (storedMember) {
      setMember(JSON.parse(storedMember));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (member) {
      localStorage.setItem(STORAGE_KEY_MEMBER, JSON.stringify(member));
    } else {
      localStorage.removeItem(STORAGE_KEY_MEMBER);
    }
  }, [member]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [token]);

  const logout = () => {
    setMember(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY_MEMBER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  };

  return (
    <MemberContext.Provider value={{ member, token, setMember, setToken, logout }}>
      {children}
    </MemberContext.Provider>
  );
};
