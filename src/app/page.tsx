'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

//add this to disable route cache especially on CSR
export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the registration page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/registration');
    }, 3000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-teal-custom min-h-screen flex justify-center items-center ">
      <h1 className="text-white font-bold text-4xl md:text-5xl">ZIMASA</h1>
    </div>
  );
}
