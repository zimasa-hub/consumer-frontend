// pages/api/nutrients.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const token = req?.headers?.authorization; // Extract token from Authorization header
    const filter = '?isMacro=false'

    console.log("TOKEN :", token);
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

  try {
    if (req.method === 'GET') {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_ZIMASA_NUTRIENTS}${filter}`;
    
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: ` ${token}`,
            },
          });
          console.log("RESPONSE : ", res);
          return res.status(200).json(response.data);
        
        } catch (error: any) {
          return res.status(error.response?.status || 500).json({ message: error.message });
        }
      };
  } catch (error) {
    // Handle errors
    console.error('Error fetching nutrients:', error);
    res.status(500).json({ error: 'Failed to fetch nutrients' });
  }
}
