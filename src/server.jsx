import React from 'react';
import ReactDom from 'react-dom/server';
import express from 'express';
import path from 'path';
import { log } from 'hlputils';
import cookieParser from 'cookie-parser';
import Html from './Html';
import App from './App';
import apiRouter from './routes/api';

const app = express();

app.use(express.static(path.resolve('dist')));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter);

const html = ReactDom.renderToString(
  <Html>
    <App />
  </Html>,
);

app.get('*', (req, res) => {
  res.send(html);
});

app.listen(3000, () => {
  log('Server is running on http://localhost:3000');
});
