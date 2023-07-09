import axios from 'axios';
import type { Request, Response } from 'express';

const getUsers = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/users/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch users');
  }
};

const getAnnouncements = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/announcements/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch announcements');
  }
};

const getTickets = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/tickets/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch tickets');
  }
};

const getTicketById = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/tickets/${req.params.id}/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch ticket by id');
  }
};

const createTicket = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  const { title, content, sender } = req.body;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/backoffice/tickets/`,
      { title, content, sender },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot create ticket');
  }
};

const editTicket = async (req: Request, res: Response) => {
  const { status } = req.body;

  const session = req.cookies.session;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.patch(
      `${process.env.BACKEND_URL}/backoffice/tickets/${req.params.id}/`,
      { status },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot edit ticket');
  }
};

const getAnnouncementById = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/announcements/${req.params.id}/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch announcement');
  }
};

const createAnnouncement = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  const { title, content, type, starting_date, end_date } = req.body;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/backoffice/announcements/`,
      { title, content, type, starting_date, end_date },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot create announcement');
  }
};

const editAnnouncement = async (req: Request, res: Response) => {
  const { title, content, type, starting_date, end_date } = req.body;

  const session = req.cookies.session;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.patch(
      `${process.env.BACKEND_URL}/backoffice/announcements/${req.params.id}/`,
      { title, content, type, starting_date, end_date },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot edit announcement');
  }
};

const deleteAnnouncement = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.delete(`${process.env.BACKEND_URL}/backoffice/announcement/${req.params.id}`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot delete announcement');
  }
};

const getFeatureById = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/features/${req.params.id}/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch feature by id');
  }
};

const createFeature = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  const { title, status } = req.body;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/backoffice/features/`,
      { title, status },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot create feature');
  }
};

const editFeature = async (req: Request, res: Response) => {
  const { title, status } = req.body;

  const session = req.cookies.session;

  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.patch(
      `${process.env.BACKEND_URL}/backoffice/features/${req.params.id}/`,
      { title, status },
      {
        headers: { Authorization: `Bearer ${session}` },
      }
    );

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot edit features');
  }
};

const deleteFeature = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.delete(`${process.env.BACKEND_URL}/backoffice/features/${req.params.id}`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot delete feature');
  }
};

const getFeatures = async (req: Request, res: Response) => {
  const session = req.cookies.session;
  if (!session) {
    return res.status(401).send('No session found');
  }

  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/backoffice/features/`, {
      headers: { Authorization: `Bearer ${session}` },
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).send('Cannot fetch features');
  }
};

export default {
  getUsers,
  getAnnouncements,
  getTickets,
  getFeatures,
  createTicket,
  getTicketById,
  createAnnouncement,
  getAnnouncementById,
  editAnnouncement,
  deleteAnnouncement,
  getFeatureById,
  createFeature,
  editFeature,
  deleteFeature,
  editTicket,
};
