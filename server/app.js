const express = require('express');
const cors = require('cors');
const guitarRouter = require('./routes/guitarRoutes');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const favoritesRouter = require('./routes/favoritesRouter');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/guitars', guitarRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/favorites', favoritesRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

module.exports = app;
