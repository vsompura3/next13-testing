import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter your username'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpires: {
      type: Date,
    },
    verifyToken: { type: String },
    verifyTokenExpires: { type: Date },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User
