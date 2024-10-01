"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Member from '@/interfaces/i-member';
import { KEY_MEMBER, KEY_TOKEN } from '@/utils/constants';

interface MemberContextType {
  member: Member | null;
  token: string | null;
  setMember: (member: Member | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  getToken: () => void;
}

export const MemberContext = createContext<MemberContextType | undefined>(undefined);

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedMember = localStorage.getItem(KEY_MEMBER);
    const storedToken = localStorage.getItem(KEY_TOKEN);

    if (storedMember) {
      setMember(JSON.parse(storedMember));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (member) {
      localStorage.setItem(KEY_MEMBER, JSON.stringify(member));
    } else {
      localStorage.removeItem(KEY_MEMBER);
    }
  }, [member]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(KEY_TOKEN, token);
    } else {
      localStorage.removeItem(KEY_TOKEN);
    }
  }, [token]);

  const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (response.ok) {
      setMember(null);
      setToken(null);
      localStorage.removeItem(KEY_MEMBER);
      localStorage.removeItem(KEY_TOKEN);
    }
  };

  const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
  }

  return (
    <MemberContext.Provider value={{ member, token, setMember, setToken, logout, getToken }}>
      {children}
    </MemberContext.Provider>
  );
};
