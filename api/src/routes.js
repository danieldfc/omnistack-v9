import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import SpotController from './app/controllers/SpotController';
import DashboardController from './app/controllers/DashboardController';
import BookingController from './app/controllers/BookingController';

import multer from 'multer';
import uploadConfig from './config/upload';

const upload = multer(uploadConfig)

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.index);

routes.post('/spots/:spot_id/bookings', BookingController.store);

export default routes;
