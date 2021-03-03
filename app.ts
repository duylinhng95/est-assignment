import express from 'express';
import databaseConnect from '@Database';
import router from "@Router";
import environment from "@Environment";

const app = express();
databaseConnect();

app.use('/', router);

const port = environment.APP_PORT;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
})
