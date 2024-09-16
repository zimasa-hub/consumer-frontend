// pages/api/auth/signin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, passwordHash } = req.body;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_ZIMASA_LOGIN}`, { email, passwordHash });
      return res.status(200).json(response.data);
    } catch (error: any) {
      return res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
