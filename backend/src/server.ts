import app from './app';
import { logger } from './utils/logger'

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info('APP', `Server running on port ${PORT}`);
});