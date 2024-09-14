// pages/api/user/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RootState } from '@/lib/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const jwt = req.headers.authorization as string; // Assumes JWT is present
    const idHeader = req.headers['x-user-id'] as string; // Extract the ID as string
    
    
    // Convert ID to integer
    const id = parseInt(idHeader, 10);

    // Check if ID conversion was successful
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

     // Remove 'x-user-id' from headers if it's not needed further
     delete req.headers['x-user-id'];

    console.log("TOKEN : ", jwt);
    console.log("USER ID : ", id);


    console.log("TOKEN : ", jwt)
    if (req.method === 'PUT') {
        const {  username, email, phone, address, dateOfBirth } = req.body;

        console.log(req.headers)

        try {              

            const response = await axios.put(`${process.env.NEXT_PUBLIC_ZIMASA_UPDATE_MEMBER}/${id}`, {
                username,
                email,
                phone,
                address,
                dateOfBirth: dateOfBirth
            }, {
                headers: {
                    Authorization: ` ${jwt}`, 
                    'Content-Type': 'application/json'
                }
            });

          

            return res.status(200).json(response.data);
        } catch (error: any) {
            return res.status(error.response?.status || 500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
