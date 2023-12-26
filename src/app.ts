import express from "express";
import { connection } from "./database/db";
import bodyParser from "body-parser";
import { router } from "./routes/user.route";
import { envConfig } from "./config/envConfig";
import { CreateRedisConnection } from "./utils/Redis";
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use("/api", router);

connection
  .then(() => {
    CreateRedisConnection();
    app.listen(envConfig.app.port, () => {
      console.log("Express is running on port 3000!");
    });
  })
  .catch((err) => console.log(err));
