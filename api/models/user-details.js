import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: [
      {
        path: {
          type: String,
        },
      },
    ],
    type: String,
  },
  { collection: "userDetails", versionKey: false }
);

const User = model("User", userSchema);

export default User;
