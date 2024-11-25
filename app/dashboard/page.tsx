import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View dashboard details",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Dashboard",
    description: "View dashboard details",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const DashboardPage = () => {
  return (
    <>
      <div className="reduced-height-container">
        <h1>Dashboard</h1>
      </div>
    </>
  )
}

export default DashboardPage;