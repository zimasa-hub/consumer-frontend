import { DateNumberType } from "react-datepicker/dist/date_utils";

// types/index.ts or another appropriate file
export interface User {
    id: string;
    username: string;
    role:string;
    accessToken: string;
  }

  export interface MicroNutrient {
    name: string;
    amount: number;
    unit: string;
  }

  export interface MealTimings {
    id:number;
    name: string;
    time: string;
    isDefault: boolean;
    createdAt:Date;
  }


  