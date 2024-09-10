'use client';
import { useParams } from 'next/navigation';
import Profile from './profile';
import Nutrition from './nutrition';
import NutrientGoal from './nutrient-goal';


export default function RegistrationPage() {
  const params = useParams();
  
  // Safely extract 'page' from params, with a fallback to undefined
  const page = params?.page as string | undefined;

  return (
    <div className="bg-white lg:w-[100%] overflow-x-hidden">
      {/* Render different content based on the value of `page` */}
      {page === 'profile' ? (
        <div>
         <Profile />
        </div>
      ) : page === 'nutrition' ? (
        <div>
          <Nutrition />
        </div>
      ) : page === 'nutrient-goal' ? (
        <div>
         <NutrientGoal />
        </div>
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}
