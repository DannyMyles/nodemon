import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compress from 'compression';
import { sequelize } from './db/connect-db';
import authRoutes from './routes/auth.api';
import roleRoutes from './routes/role.api';
import userRoutes from './routes/user.api';
import imageRoutes from './routes/image.api';
import errorHandler from './core/errorHandler/errorHandler';
const app = express();
const logger = require('morgan')
app.use(logger('dev'))
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
app.set('showStackError', true);
app.use(compress());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static('public/uploads'));

sequelize
  .sync()
  .then(() => 'Connected to DB!')
  .catch((err) => console.log(err, 'DB ERROR!!!'));

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.use('/image', imageRoutes);
errorHandler(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
