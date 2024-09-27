import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";

app.listen(process.env.PORT || 8080, () => {
  console.log("Listening to: ", process.env.PORT);
});
