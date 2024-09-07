'use client';
import { useParams } from 'next/navigation';
import SignUp from './signup';
import OtpScreen from './otp'; // Import your OTP screen component
import SignIn from './signin'

export default function RegistrationPage() {
  const params = useParams();
  
  // Safely extract 'page' from params, with a fallback to undefined
  const page = params?.page as string | undefined;

  return (
    <div className="bg-white lg:w-[100%] overflow-x-hidden">
      {/* Render different content based on the value of `page` */}
      {page === 'signin' ? (
        <div>
          <SignIn />
        </div>
      ) : page === 'signup' ? (
        <div>
          <SignUp />
        </div>
      ) : page === 'otp' ? (
        <div>
          <OtpScreen />
        </div>
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}
