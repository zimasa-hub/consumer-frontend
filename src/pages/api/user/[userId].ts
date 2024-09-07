import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Violation {
    field: string;
    message: string;
  }
// Define the type for user data (modify as needed based on your actual data model)
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
  violations?: Violation[]; //
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserData | { message: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Log request details
    console.log(`Fetching user data for user ID: ${userId}`);
    console.log(`Request headers:`, req.headers);

    // Replace with your actual backend service or database URL
    const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_UPDATE_MEMBER}/${userId}`;
    console.log(`Making request to API URL: ${apiUrl}`);
    
    const response = await axios.get<UserData>(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    // Log Axios response details
    console.log("Response data:", response.data);

     // Check if the response data contains violations
     if (response.data.violations) {
        // Forward the violations along with the user data
        res.status(200).json(response.data);
      } else {
        // If no violations, just return the user data
        res.status(200).json(response.data);
      }

    // Return user data
    res.status(200).json(response.data);
  } catch (error) {
    // Log error details
    console.error('Error fetching user data:', error);

    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Internal Server Error' });
    } else if (error instanceof Error) {
      // Handle standard errors
      res.status(500).json({ message: error.message });
    } else {
      // Fallback for unknown error types
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
