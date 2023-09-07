import app from './app.js';
import logger from './utils/logger.js';

const port = process.env.PORT || 4000;

app.listen(port, () => {
  logger.info(`App running in ${app.get('env')} mode on http://localhost:${port}`);
});

