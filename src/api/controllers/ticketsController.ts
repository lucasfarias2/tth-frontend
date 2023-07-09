import axios from 'axios';
import type { Request, Response } from 'express';

const getUserTickets = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/tickets/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch user tickets');
  }
};

const createTicket = async (req: Request, res: Response) => {
  const { title, content, sender } = req.body;

  const session = req.cookies.session;

  let headers = {};

  if (session) {
    headers = { Authorization: `Bearer ${session}` };
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/tickets/create/`,
      { title, content, sender, type: 'email' },
      {
        headers,
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot create ticket');
  }
};

export default { getUserTickets, createTicket };
