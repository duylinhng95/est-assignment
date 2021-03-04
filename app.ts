import express from 'express';
import databaseConnect from '@Database';
import router from "@Router";
import environment from "@Environment";
import {json} from 'body-parser';

const app = express();
databaseConnect();

app.use(express.json());
app.use('/', router);

const port = environment.APP_PORT;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
})
