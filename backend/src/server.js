import http from "http";
import "dotenv/config";

import app from "./app.js";

// App config
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(PORT, () => console.log(`Server Listening on post: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
