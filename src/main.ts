import { app } from "./application";
import { PORT, logger } from "./config";

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
