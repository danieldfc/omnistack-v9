import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { resolve } from 'path';

import socketio from 'socket.io';
import http from 'http';

import routes from './routes';

const conectadoUsuarios = {};

class App {
  constructor() {
    this.server = express();

    this.app = new http.Server(this.server);
    this.io = socketio(this.app);

    this.middlewares();
    this.database();
    this.socket();
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

  socket() {
    this.io.on('connection', socket => {
      console.log('Userário Conectado', socket.id);

      const { user_id } = socket.handshake.query;

      conectadoUsuarios[user_id] = socket.id;
    });
    this.server.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = conectadoUsuarios;

      return next();
    })
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

export default new App().app;
