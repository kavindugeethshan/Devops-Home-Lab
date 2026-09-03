import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        otp: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const PasswordReset =
    mongoose.models.PasswordReset ||
    mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;