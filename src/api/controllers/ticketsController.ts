import axios from 'axios';
import type { Request, Response } from 'express';

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

export default { createTicket };
