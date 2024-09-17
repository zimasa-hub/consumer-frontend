import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NutritionPayload } from '@/lib/interfaces';

interface Violation {
  field: string;
  message: string;
}

interface UserData {
  id: number;
  principalId: number;
  relationshipTypeId: number;
  username: string;
  email: string | null;
  passwordHash: string;
  roleId: number;
  corporateId: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  dateOfBirth: string | null;
  medicalHistory: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  violations?: Violation[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserData | NutritionPayload | { message: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log("REQ QUERY : ", req.query);

  const { params } = req.query; // Use params to capture dynamic routes
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (params && Array.isArray(params) && params.length > 0) {
      const param = params[0];
      
      if (!isNaN(Number(param)) && Number(param) > 0) {
        // Handle userId request
        console.log(`Fetching user data for user ID: ${param}`);

        const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_UPDATE_MEMBER}/${param}`;
        const response = await axios.get<UserData>(apiUrl, {
          headers: {
            Authorization: ` ${token}`,
          }
        });

        return res.status(200).json(response.data);
      } else if (!isNaN(Date.parse(param))) {
        // Handle formattedDate request
        console.log(`Fetching nutrition goal data for date: ${param}`);

        const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_GETGOAL}?date=${param}`;
        const response = await axios.get<NutritionPayload>(apiUrl, {
          headers: {
            Authorization:` ${token}`,
          }
        });

        return res.status(200).json(response.data);
      } else {
        return res.status(400).json({ message: 'Invalid parameter' });
      }
    } else {
      return res.status(400).json({ message: 'Missing parameters' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);

    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Internal Server Error' });
    } else if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
