import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const osData = {
      type: 'Linux',
      hostname: 'example-host',
      cpu_num: 4,
      total_mem: '16GB'
    };
    res.status(200).json(osData);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
