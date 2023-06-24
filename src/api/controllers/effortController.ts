import axios from 'axios';
import type { Request, Response } from 'express';

const getEffortsByWeek = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/efforts/week/${req.params.week}`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch efforts');
  }
};

const createEffort = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  const { habit, week, level } = req.body;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/efforts/`,
      { habit, week, level },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot create effort');
  }
};

const editEffort = async (req: Request, res: Response) => {
  const { week, level } = req.body;

  const session = req.cookies.session;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.patch(
      `${process.env.BACKEND_URL}/efforts/${req.params.id}/`,
      { week, level },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot edit habit');
  }
};

export default { getEffortsByWeek, editEffort, createEffort };
