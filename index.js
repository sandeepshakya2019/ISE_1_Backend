import "dotenv/config";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

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
