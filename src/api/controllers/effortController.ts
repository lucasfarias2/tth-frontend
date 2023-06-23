import axios from 'axios';
import type { Request, Response } from 'express';

const getEffortsByWeek = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/effortlogs/week/${req.params.week}`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch efforts');
  }
};

export default { getEffortsByWeek };
