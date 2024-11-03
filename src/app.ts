import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { appConfig, CorsConfig } from './configs';
import authenticationRoutes from './routes/authentication';

const app = express();

// Cors Configuration
app.use(cors(CorsConfig));

// JSON Middleware
app.use(bodyParser.json());

// Assign Routes
app.use('/api/auth', authenticationRoutes);

// Connect to Mongodb Atlas
mongoose
  .connect(appConfig.dbConnectionString)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas', error));

// Serve
app.listen(appConfig.port, () => {
  console.log(`App listening to http://localhost:${appConfig.port}`);
});
