require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const {loginRequired, ensureCorrectUser} = require('./middleware/auth');

const PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use(
  '/api/user/:id/messages', 
  loginRequired, 
  ensureCorrectUser, 
  messagesRoutes
);
app.get('/api/messages', loginRequired, async (req, res, next) => {
  try {
    let messages = await db.Message.find()
      .sort({createdAt: 'desc'})
      .populate('user', {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch(err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is listening.');
});