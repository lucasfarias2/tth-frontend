import axios from 'axios';
import type { Request, Response } from 'express';

const getSiteConfig = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/site-config/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    console.log("data", data)

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch site config');
  }
};

export default { getSiteConfig };
