import app from './app.js';
// import logger from './utils/logger.js';
import dbConnect from './utils/db.js';

const PORT = process.env.PORT || 4000;

dbConnect();

app.listen(PORT, () => {
  console.log(`App running in ${app.get('env')} mode on http://localhost:${PORT}`);
});
