const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const bookRoutes = require("./routes/BookRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Book Store API is running!" });
});

app.use("/api/books", bookRoutes);

const startServer = async () => {
  
  await connectDB();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
