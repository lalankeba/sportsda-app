"use client";
import React, { createContext, ReactNode, useState } from "react";

const sidebarLinks = [
  { title: "Dashboard", path: '/dashboard'},
  { title: "Profile", path: '/dashboard/profile'},
];

interface SideBarContextType {
  sidebarLinks: typeof sidebarLinks;
  showOffcanvas: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

interface SideBarProviderProps {
  children: ReactNode;
}

export const SideBarProvider: React.FC<SideBarProviderProps> = ({children}) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <SideBarContext.Provider value={ {sidebarLinks, showOffcanvas, handleClose, handleShow} }>
      {children}
    </SideBarContext.Provider>
  );
}
