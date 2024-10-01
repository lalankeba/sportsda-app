'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMember } from '@/hooks/use-member';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { member } = useMember();
  const router = useRouter();

  useEffect(() => {
    if (!member) {
      router.push('/login');
    }
  }, [member, router]);

  if (!member) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
