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

  

  