import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import paymentRouter from "./routes/payment.route.js";
dotenv.config();

const app = express();

app.use(cors({
    origin: "https://intervai-client-ai.onrender.com",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("server started" + PORT);
    connectDb()
})