import axios from 'axios';
import type { Request, Response } from 'express';

const getHabits = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/habits/`, {
      headers: { Authorization: `Bearer ${session}` },
      params: { week: req.query.week },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch habits');
  }
};

const getHabitById = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/habits/${req.params.id}/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch habit');
  }
};

const createHabit = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  const { name, starting_week, expected_effort, color, ending_week } = req.body;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/habits/`,
      { name, starting_week, expected_effort, color, ending_week },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot create habit');
  }
};

const editHabit = async (req: Request, res: Response) => {
  const { name, starting_week, expected_effort, color, ending_week } = req.body;

  const session = req.cookies.session;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.patch(
      `${process.env.BACKEND_URL}/habits/${req.params.id}/`,
      { name, starting_week, expected_effort, color, ending_week },
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

const deleteHabit = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.delete(`${process.env.BACKEND_URL}/habits/${req.params.id}`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot delete habit');
  }
};

export default { getHabits, getHabitById, createHabit, editHabit, deleteHabit };
