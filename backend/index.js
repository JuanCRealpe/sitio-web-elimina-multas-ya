const dotenv = require("dotenv");
const express = require("express");
const app = express();

const connectDB = require("./config/db")

const auth = require("./routes/auth.routes")
const task = require("./routes/task.routes");
const course = require("./routes/course.routes");
const step = require("./routes/step.routes"); // ← NUEVO
const payment = require("./routes/payment.routes"); // ← NUEVO pago
const cors = require("cors")

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // ← NUEVO


app.use("/api/auth", auth);
app.use("/api/task", task);
app.use("/api/courses", course);
app.use("/api/steps", step); // ← NUEVO
app.use("/api/payment", payment); // ← NUEVO

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`te conectaste al puerto ${ PORT }`)
})
