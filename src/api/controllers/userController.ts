import axios from 'axios';
import type { Request, Response } from 'express';

const updateProfile = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  const { first_name, last_name, email, password, old_password } = req.body;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.patch(
      `${process.env.BACKEND_URL}/user/profile/`,
      { first_name, last_name, email, old_password, password },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot update user profile');
  }
};

export default { updateProfile };
