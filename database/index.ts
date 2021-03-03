import {ConnectionOptions, connect} from 'mongoose';
import environment from "../config/environment";

const databaseConnect = async () => {
  try {
    const host = environment.DATABASE_HOST;
    const port = environment.DATABASE_PORT;
    const dbname = environment.DATABASE_NAME;

    const mongoURI: string = `mongodb://${host}:${port}/${dbname}`;

    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    await connect(mongoURI, options);
    console.log("Database connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default databaseConnect;
