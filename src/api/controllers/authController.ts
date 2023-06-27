import axios from 'axios';
import type { Request, Response } from 'express';

const options = { maxAge: 60 * 60 * 24 * 5 * 1000, httpOnly: true, secure: true, path: '/' };

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/auth/login/`, {
      email,
      password,
    });

    res.cookie('session', data.token, options);

    res.send(data.token);
  } catch (err) {
    console.log(err);
    res.status(401).send('Error logging in');
  }
};

const logout = async (req: Request, res: Response) => {
  if (!req.cookies.session) {
    res.redirect('/');
  }

  try {
    await axios.post(
      `${process.env.BACKEND_URL}/auth/logout/`,
      {},
      {
        headers: { Authorization: `Bearer ${req.cookies.session}` },
      }
    );

    res.clearCookie('session');
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect('/');
  }
};

const signup = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/auth/register/`, {
      email,
      password,
      first_name,
      last_name,
    });

    res.cookie('session', data.token, options);

    res.send(data.token);
  } catch (err) {
    console.log(err);
    res.status(401).send('Error signing up');
  }
};

const currentUser = async (req: Request, res: Response) => {
  if (!req.cookies.session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/auth/user/`, {
      headers: { Authorization: `Bearer ${req.cookies.session}` },
    });

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Error fetching currentUser');
  }
};

export default { login, logout, signup, currentUser };
