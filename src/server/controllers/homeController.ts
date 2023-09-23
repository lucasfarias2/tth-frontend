import type { NextFunction, Request, Response } from 'express';
import type { PacklifyServerRequest, PacklifyServerResponse } from '@packlify/server';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  next();
};

const render = (req: PacklifyServerRequest, res: PacklifyServerResponse) => {
  res.renderView('home', { initialState: res.locals.initialState, device: req.device });
};

export default { render, fetch };
