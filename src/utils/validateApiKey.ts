import type { Request, Response, NextFunction } from 'express';

const VALID_API_KEY = 'my-secret-key';

export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== VALID_API_KEY) {
    res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    return;
  }
  next();
};
// Fix lint error: explicit return type
export const validateApiKeyWithType = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== VALID_API_KEY) {
    res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    return;
  }
  next();
};
