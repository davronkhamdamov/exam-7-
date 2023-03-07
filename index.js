const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const middleware = require('./middleware/middleware');

const courseRouter = require('./routes/routes');
const carRouter = require('./routes/car');
const animalsRouter = require('./routes/animals');
const usersRouter = require('./routes/users');

dotenv.config();
const port = process.env.PORT || 4041;

const app = express();
app.use(cors());
app.use(express.json());

app.use(middleware);

app.use(courseRouter);
app.use(carRouter);
app.use(animalsRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port} is running`);
});
