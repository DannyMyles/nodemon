import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db/connect-db';
import authRoutes from './routes/auth.api';
import roleRoutes from './routes/role.api';
import userRoutes from './routes/image.api';

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static('public/uploads'));

sequelize
  .sync()
  .then(() => 'Connected to DB!')
  .catch((err) => console.log(err, 'DB ERROR!!!'));

app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
