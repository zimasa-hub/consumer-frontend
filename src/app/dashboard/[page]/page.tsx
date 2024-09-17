"use server";

import { Suspense, use } from 'react';
import Profile from './profile';
import Nutrition from './nutrition';
import NutrientGoal from './nutrient-goal';
import NutrientGoalFallback from './NutritionGoalFallback';

// Server component to fetch the params from the URL
export default async function RegistrationPage({
  params,
}: {
  params: { page: string };
}) {
  const page = params.page; // Get the 'page' from params directly

  return (
    <div className="bg-white lg:w-[100%] overflow-x-hidden">
      {/* Render different content based on the value of `page` */}
      {page === 'profile' ? (
        <div>
          <Suspense fallback={<NutrientGoalFallback />}>
          <Profile />
          </Suspense>
          
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
