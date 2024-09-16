import Link from 'next/link';
import React from 'react'

const NotFound = () => {
  return (
    <div>
      <h3>Resource Not Found</h3>
      <p>Go back to <Link href="/">homepage</Link></p>
    </div>
  )
}

export default NotFound;
