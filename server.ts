import environment from "@Environment";
import app from "./app";

const port = environment.APP_PORT;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
