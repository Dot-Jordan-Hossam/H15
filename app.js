const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
}));


dotenv.config();

connectDB();

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.Routes");
const itemRoutes = require("./routes/item.routes")

app.use('/api/v1', authRoutes)
app.use('/api/v1', itemRoutes)



app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});