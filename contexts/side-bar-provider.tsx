"use client";
import React, { createContext, ReactNode, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Role from "@/enums/role";

const baseLinks = [
  { title: "Dashboard", path: '/dashboard'},
  { title: "Profile", path: '/dashboard/profile'},
];

interface SideBarContextType {
  sidebarLinks: { title: string; path: string }[];
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
  const { user } = useUser();
  const memberRoles = user?.publicMetadata?.roles as Role[];

  const sidebarLinks = [...baseLinks];

  const adminLinks = [
    { title: "Faculties", path: '/dashboard/faculties' },
  ];

  const instructorLinks = [
    { title: "Matches", path: '/dashboard/matches' },
  ];

  if (memberRoles?.includes(Role.Admin)) {
    adminLinks.forEach(newLink => {
      const isLinkExists = sidebarLinks.find(link => link.path === newLink.path);
      if (!isLinkExists) {
        sidebarLinks.push(newLink);
      }
    });
  }

  if (memberRoles?.includes(Role.Instructor)) {
    instructorLinks.forEach(newLink => {
      const isLinkExists = sidebarLinks.find(link => link.path === newLink.path);
      if (!isLinkExists) {
        sidebarLinks.push(newLink);
      }
    });
  }


  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <SideBarContext.Provider value={ {sidebarLinks, showOffcanvas, handleClose, handleShow} }>
      {children}
    </SideBarContext.Provider>
  );
}
