import jwt from 'jsonwebtoken';
import UserModel from '../models/users';

async function auth(req, res, next) {
  const { sessionId } = req.cookies;
  const secretKey = '*O*CeYj~`RGFU}7';

  if ((res.locals.user, !sessionId || !secretKey)) {
    return next();
  }

  const { email } = await new Promise((resolve, reject) => {
    jwt.verify(sessionId, secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  }).catch(() => {
    res.clearCookie('sessionId');
    return next();
  });

  const user = await UserModel.getUserByEmail(email).catch(() => {
    res.clearCookie('sessionId');
    return next();
  });

  res.locals.user = user;

  return next();
}

export default auth;
