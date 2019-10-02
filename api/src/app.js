import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { resolve } from 'path';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.server.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    );
    this.server.use(express.json());
    this.server.use('/files', express.static(
      resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }

  database() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
