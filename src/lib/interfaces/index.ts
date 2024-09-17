import { DateNumberType } from "react-datepicker/dist/date_utils";

// types/index.ts or another appropriate file
export interface User {
    id: string;
    username: string;
    role:string;
    accessToken: string;
  }

  export interface MicroNutrient {
    id:number
    name: string;
    amount: number;
    unit: string;
    macro:boolean,
  }

  export interface MealTimings {
    id:number;
    name: string;
    time: string;
    isDefault: boolean;
    createdAt:Date;
  }

  interface DietPlan {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    createdAt: string;
  }
  
  interface Nutrient {
    id: number;
    name: string;
    unit: string;
    amount: number;
    macro: boolean;
  }
  
 export interface NutrientTarget {
    id: number;
    nutrient: Nutrient;
    dailyTarget: number;
    totalTarget: number;
  }
  
  interface MealTiming {
    id: number;
    name: string;
    time: string;
    isDefault: boolean;
    createdAt: string;
  }
  
  interface PlannedMealSchedule {
    id: number;
    dietPlan: DietPlan;
    mealTimings: MealTiming;
    time: string;
    isDefault: boolean;
    createdAt: string;
    amountsConsumed: any[]; // Modify this if you have a specific structure for amountsConsumed
  }
  
  interface NutritionTarget {
    id: number;
    goalStart: string;
    goalEnd: string;
    active: boolean;
    dietPlan: DietPlan;
    totalCaloriesSet: number;
    remainingCalories: number;
    createdAt: string;
    updatedAt: string;
  }

 export  interface Violation {
    field: string;
    message: string;
  }
  
  export interface NutritionPayload {
    nutritionTarget: NutritionTarget;
    nutrientTargets: NutrientTarget[];
    plannedMealSchedule: PlannedMealSchedule[];
    violations?: Violation[]; //
  }
  

  