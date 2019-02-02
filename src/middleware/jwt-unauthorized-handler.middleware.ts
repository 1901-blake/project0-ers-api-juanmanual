export function unauthorizedHandler(err, req, res, next): void {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid Credentials');
    }
  }