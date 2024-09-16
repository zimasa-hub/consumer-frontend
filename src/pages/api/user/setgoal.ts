import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req?.headers?.authorization; // Extract token from Authorization header

  console.log("TOKEN arnold:", token);
  console.log("REQ METHOD:", req.method);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Log raw request body
    console.log("RAW REQUEST BODY:", req.body);

    console.log("RAW REQUEST BODY:", req.body.nutritionTarget.goalStart);

    // Validate req.body structure
    if (!req.body.nutritionTarget.description || !req.body.nutritionTarget.goalStart || !req.body.nutritionTarget.goalEnd) {
      return res.status(400).json({ message: 'Invalid request payload' });
    }

    // Modify req.body directly
    const modifiedBody = {
      nutritionTarget: req.body.nutritionTarget,
      nutrientTargets: req.body.nutrientTargets,
      mealTimings: req.body.mealTimings,
      mealSchedules: req.body.mealSchedules,
    };

    console.log("Modified request body:", modifiedBody);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_SETGOAL}`;

      const response = await axios.post(apiUrl, modifiedBody, {
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
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    console.log("RESPONSE:", res.status);
  }
};

export default handler;
