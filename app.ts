import express from 'express';
import databaseConnect from '@Database';
import router from "@Router";

const app = express();
databaseConnect();

app.use(express.json());
app.use('/', router);

export default app;
