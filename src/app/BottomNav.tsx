"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { FaHome, FaCommentDots, FaBell, FaUser } from 'react-icons/fa';

const BottomNav = () => {
  const pathname = usePathname(); // Get the current path

  const linkStyle = (path: string) =>
    pathname === path ? 'text-teal-custom' : 'text-gray-400'; // Use pathname

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-lg">
      <ul className="flex justify-around items-center py-2">
        <li>
          <Link href="/dashboard" className={`flex flex-col items-center ${linkStyle('/dashboard')}`}>
            <FaHome className="text-xl" />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/chat" className={`flex flex-col items-center ${linkStyle('/chat')}`}>
            <FaCommentDots className="text-xl" />
            <span className="text-xs">Chat</span>
          </Link>
        </li>
        <li>
          <Link href="/notifications" className={`flex flex-col items-center ${linkStyle('/notifications')}`}>
            <FaBell className="text-xl" />
            <span className="text-xs">Notifications</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className={`flex flex-col items-center ${linkStyle('/dashboard/profile')}`}>
            <FaUser className="text-xl" />
            <span className="text-xs">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
