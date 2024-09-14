// pages/api/meal_timings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { rateLimiterMiddleware } from '@/lib/rateLimiter'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 
  
    const token = req?.headers?.authorization // Extract token from Authorization header

    console.log("TOKEN :", token)
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  

    if (req.method === 'GET') {
    // Apply rate limiter middleware for GET requests
    await new Promise((resolve, reject) => {
      rateLimiterMiddleware(req, res, (err: any) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_MEAL_TIMINGS}`;

      const response = await axios.get(apiUrl, {
        headers: {
        Authorization: ` ${token}`,
      }});
      console.log("RESPONSE : ",res);
      return res.status(200).json(response.data);
    
    } catch (error: any) {
      return res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else if (req.method === 'POST' || req.method === 'PUT') {
    // Apply rate limiter middleware for POST and PUT requests
    await new Promise((resolve, reject) => {
      rateLimiterMiddleware(req, res, (err: any) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    try {
      const url = req.method === 'POST'
        ? 'http://192.0.1.23:5001/meal_timings/public'  // Adjust URL as needed
        : 'http://192.0.1.23:5001/meal_timings/public'; // Adjust URL as needed
      
      const response = await axios({
        method: req.method.toLowerCase(),
        url,
        data: req.body,
      });
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
