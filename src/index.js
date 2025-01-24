import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error(`[-] Error starting the server: ${err}`);
    });
    app.listen(process.env.PORT || 3006, () => {
      console.log(
        `[+] Server is running at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("[-] Error connecting to the database", err);
    process.exit(1);
  });

// app.listen(process.env.PORT || 3006, () => {
//   console.log(`[+] Server is running at http://localhost:${process.env.PORT}`);
// });
