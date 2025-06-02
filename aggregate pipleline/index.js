import "dotenv/config";
// const { mongoose } = require("mongoose")
import { mongoose } from "mongoose";
(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB connected");
})();
