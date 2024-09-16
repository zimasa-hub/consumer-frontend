// pages/api/nutrition.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const token = req?.headers?.authorization; // Extract token from Authorization header

  console.log("TOKEN :", token);
  console.log("REQ METHOD", req.method)
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_MEAL_TIMINGS}`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("RESPONSE : ", res);
      return res.status(200).json(response.data);
    
    } catch (error: any) {
      return res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    const {  description, goalStart, goalEnd, mealTimings, nutrientTargets, mealSchedules,dietPlan } = req.body;
    console.log("REQUEST BODY : ",req.body);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_MEAL_TIMINGS}`;
      
      const response = await axios.post(apiUrl, {
     description,
     goalStart,
     goalEnd,
     mealTimings,
     nutrientTargets,
     mealSchedules,
     dietPlan
    }, {
        headers: {
            Authorization: ` ${token}`, 
            'Content-Type': 'application/json'
        }
    });

    console.log("RESPONSE : ", response.data);
      return res.status(response.status).json(response.data);
      
    
    } catch (error: any) {
      return res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
