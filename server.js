import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import http from "http";
import dns from "dns";
import mongoose from "mongoose";
import cors from "cors";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import adminRouter from "./routers/adminRouter.js";
import cartRouter from "./routers/CartRouters.js";
import orderRouter from "./routers/orderRouter.js";
import paymentRouter from "./routers/PaymentRouter.js";

const app = express();
// cors error handling 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("frontend"));

// Create HTTP server & Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Attach io instance to app so controllers can access it via req.app.get("io")
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// MongoDB connection
const mongoDBURI = process.env.MONGO_URI;
mongoose.connect(mongoDBURI).then(() => {
  console.log("Connected to MongoDB successfully ");
});

// Routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/", reviewRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/payments", paymentRouter);

// 404 Not Found Middleware (Custom 404 HTML Page & JSON Fallback)
app.use((req, res) => {
  if (req.accepts("html")) {
    return res.status(404).sendFile("404.html", { root: "frontend" });
  }
  return res.status(404).json({
    message: "Resource not found",
    error: "Not Found"
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});