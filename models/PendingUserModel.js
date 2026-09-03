import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    Image: {
      type: String
    },
    emailverificationotp: {
      type: String,
      required: true
    },
    emailverificationotpexpires: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const PendingUser = mongoose.models.PendingUser || mongoose.model("PendingUser", pendingUserSchema);

export default PendingUser;
