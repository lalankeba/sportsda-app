import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Member",
  description: "View member details",
  keywords: ["dashboard", "sport", "analyze", "analyse", "optimize"],
  openGraph: {
    title: "Member",
    description: "View member details",
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
        <h1>Member</h1>
      </div>
    </>
  )
}

export default MemberPage;