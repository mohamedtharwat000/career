import express from 'express';
import ms from 'ms';
import jwt from 'jsonwebtoken';
import UserModel from '../models/users';
import JobsModel from '../models/jobs';
import auth from '../middlewares/authMiddleware';
import JobAppModel from '../models/jobApp';

const apiRouter = express.Router();

apiRouter.get('/users', async (req, res) => {
  const users = await UserModel.getUsers().catch((error) => {
    return res.status(500).json({ message: error.message });
  });
  return res.json(users);
});

apiRouter.get('/user', auth, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.json(user);
});

apiRouter.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'username, email, and password are required' });
  }

  const isUser = await UserModel.getUserByEmail(email);
  if (isUser) return res.status(500).json({ message: 'User already exists' });

  const user = await UserModel.addUser(username, email, password).catch(
    (error) => {
      return res.status(500).json({ message: error.message });
    },
  );

  return res.json(user);
});

apiRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await UserModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordCorrect = await UserModel.compareUserPassword(
    password,
    user.password,
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const secretKey = '*O*CeYj~`RGFU}7';

  const token = jwt.sign(
    { email: user.email, username: user.name },
    secretKey,
    {
      expiresIn: '24h',
    },
  );

  res.cookie('sessionId', token, {
    httpOnly: true,
    maxAge: ms('24h'),
  });

  return res.json({ email: user.email, username: user.username });
});

apiRouter.delete('/logout', async (req, res) => {
  res.clearCookie('sessionId');
  return res.json({ message: 'Logged out' });
});

apiRouter.get('/jobs', async (req, res) => {
  const jobs = await JobsModel.getJobs().catch((error) => {
    return res.status(500).json({ message: error.message });
  });
  return res.json(jobs);
});

apiRouter.get('/apps', auth, async (req, res) => {
  const { user } = res.locals;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const jobApps = await JobAppModel.getJobAppsByEmail(user.email);

  return res.json(jobApps);
});

apiRouter.post('/apply', auth, async (req, res) => {
  const { id, firstName, lastName, email, phone, resume, coverLetter } =
    req.body;

  if (
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !resume ||
    !coverLetter
  ) {
    return res.status(400).json({
      message: 'All feilds are required',
    });
  }

  await JobAppModel.addJobApp({
    id,
    firstName,
    lastName,
    email,
    phone,
    resume,
    coverLetter,
  });

  return res.json({
    message: 'Application submitted',
  });
});

export default apiRouter;
