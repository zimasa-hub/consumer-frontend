// pages/api/auth/signup.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, passwordHash, phone } = req.body;
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ZIMASA_REGISTER}`, { username, email, passwordHash, phone });
            
            return res.status(200).json(response.data);
        } catch (error: any) {
            return res.status(error.response?.status || 500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
