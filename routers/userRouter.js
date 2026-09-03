import express from "express";
import { createUser, verifyEmail, resendOTP, loginUser, getprofile, updateprofule, changePassword, deleteOwnAccount, updateAddress, forgotPassword, verifyResetOtp, resetPassword } from "../Controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const userRouter = express.Router();


// Public routes
userRouter.post("/create", createUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-otp", resendOTP);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-reset-otp", verifyResetOtp);
userRouter.post("/reset-password", resetPassword);


// Authentication middleware
userRouter.use(authMiddleware);
// Protected routes
userRouter.get("/profile", getprofile);
userRouter.put("/profile", updateprofule);
userRouter.put("/change-password", changePassword);
userRouter.delete("/delete-account", deleteOwnAccount);
userRouter.put("/address", updateAddress);

export default userRouter;