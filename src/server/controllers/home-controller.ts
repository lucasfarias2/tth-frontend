import type { PacklifyServerRequest, PacklifySserverResponse } from '@packlify/server';
import type { NextFunction } from 'express';

const fetch = async (req: PacklifyServerRequest, res: PacklifyServerResponse, next: NextFunction) => {
  const initialState = {
    title: 'Packlify',
    subtitle: 'App created with Packlify web',
  };

  res.locals.initialState = initialState;

  next();
};

const render = (req: PacklifyServerRequest, res: PacklifyServerResponse) => {
  res.renderView('home', { initialState: res.locals.initialState, device: req.device });
};

export default { render, fetch };
