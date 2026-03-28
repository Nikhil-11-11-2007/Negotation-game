import dns from "node:dns/promises"

dns.setServers(["1.1.1.1", "8.8.8.8"])

import mongoose from "mongoose";
import "dotenv/config"


export const connectToDB = async() => {
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}