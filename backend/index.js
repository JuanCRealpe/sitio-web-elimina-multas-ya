const dotenv = require("dotenv");
const express = require("express");
const app = express();

const connectDB = require("./config/db")

const auth = require("./routes/auth.routes")
const task = require("./routes/task.routes");

dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/auth", auth)
app.use("/api/task", task);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`te conectaste al puerto ${ PORT }`)
})
