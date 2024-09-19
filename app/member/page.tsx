import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Dashboard of sports analyzer",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Member Dashboard",
    description: "Dashboard of sports analyzer",
    type: "website",
    images: [
      {
        url: "/images/back1.jpeg",
        alt: "Sports Analyzer"
      }
    ]
  }
};

const MemberPage = () => {
  return (
    <>
      <div>
        <h1>Member Dashboard</h1>
        <p>redirect to <Link href="/login">login</Link> page</p>
        <p>redirect to <Link href="/member">member</Link> page</p>
      </div>
    </>
  )
}

export default MemberPage;