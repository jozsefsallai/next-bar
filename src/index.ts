import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export interface BAROptions {
  get?: NextApiHandler;
  post?: NextApiHandler;
  patch?: NextApiHandler;
  put?: NextApiHandler;
  delete?: NextApiHandler;
  options?: NextApiHandler;

  fallback?: NextApiHandler;
}

export type SupportedMethods = 'get' | 'post' | 'patch' | 'put' | 'delete' | 'options';

const fallback = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(405).write('Method not allowed.');
  res.end();
};

const bar = (opts: BAROptions): NextApiHandler => {
  return (req: NextApiRequest, res: NextApiResponse): Promise<void> | void => {
    if (!req.method) {
      // I don't know in what scenarios `method` isn't part of the request, but
      // Next's typings say it's possibly undefined, so we will end the request
      // if that ever happens.
      res.end();
      return;
    }

    const method = req.method.toLowerCase() as SupportedMethods | 'fallback';

    if (method !== 'fallback' && !opts[method]) {
      return opts.fallback
        ? opts.fallback(req, res)
        : fallback(req, res);
    }

    return opts[method](req, res);
  };
};

export default bar;
