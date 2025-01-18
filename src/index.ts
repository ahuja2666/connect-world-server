import { config } from "dotenv"; 
config();

import { connectDB } from "./config/db"; 
import { app } from "./app";

// Start the server
const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
}

startServer();

