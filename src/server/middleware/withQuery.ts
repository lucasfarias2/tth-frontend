import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextFunction, Request, Response } from 'express';

const withQueryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.queries = {};

  res.loadQueryKeys = queryKeys => {
    const queryClient = new QueryClient();

    queryKeys.forEach(queryKey => {
      queryClient.setQueryData([queryKey], res.queries[queryKey]);
    });

    res.locals.initialState = dehydrate(queryClient);

    queryClient.clear();

    return res;
  };

  return next();
};

export default withQueryMiddleware;
