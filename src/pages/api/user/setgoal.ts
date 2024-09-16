// pages/api/setgoal.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req?.headers?.authorization; // Extract token from Authorization header

  console.log("TOKEN:", token);
  console.log("REQ METHOD:", req.method);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { 
      description, 
      goalStart, 
      goalEnd, 
      selectedMealTimings, 
      nutrientTargets, 
      mealSchedules, 
      dietPlan 
    } = req.body;

    console.log("REQUEST BODY:", req.body);

    // Transform payload to match the backend API format
    const payload = {
      nutritionTarget: {
        description,           // Goal description
        goalStart,             // Start date in ISO string format
        goalEnd,               // End date in ISO string format
        dietPlan              // Diet plan (make sure this is correctly set)
      },
      nutrientTargets: nutrientTargets.map(({ id, amount }: { id: number, amount: number }) => ({
        nutrientID: id,
        dailyTarget: amount
      })),
      mealTimings: selectedMealTimings.map((id: number) => ({ id })),
      mealSchedules: mealSchedules.map((id: number) => ({ mealTimingId: id }))
    };

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_SETGOAL}`;

      const response = await axios.post(apiUrl, payload, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("RESPONSE:", response.data);
      return res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error('Error in API request:', error.message);
      return res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    console.log("RESPONSE:", res.status);
  }
};

export default handler;
