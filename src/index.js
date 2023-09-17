import { app } from "./app.js";
import connectDB from "./db/index.js";

/**
 * Starting from Node.js v14 top-level await is available and it is only available in ES modules.
 * This means you can not use it with common js modules or Node version < 14.
 */

await connectDB();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port : ${process.env.PORT || 8080}`);
});
