import axios from 'axios';
import type { Request, Response } from 'express';

const getWeekCompletion = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/completion/${req.params.week}/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch week completion');
  }
};

const getRecentCompletion = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/completion/${req.params.week}/recent`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch week completion');
  }
};

const getHabitPerformance = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/performance/${req.params.habit}/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch week completion');
  }
};

const getGlobalPerformance = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/performance/global/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch week completion');
  }
};

export default { getWeekCompletion, getRecentCompletion, getHabitPerformance, getGlobalPerformance };
