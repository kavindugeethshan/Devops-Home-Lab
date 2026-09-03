import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createOrder, getMyOrders, getOrderById, cancelOwnOrder } from "../Controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/my-orders", authMiddleware, getMyOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);
orderRouter.patch("/:id/cancel", authMiddleware, cancelOwnOrder);

export default orderRouter;