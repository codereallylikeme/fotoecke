import mongoose, { Schema, models } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'staff'],
    default: 'staff',
  },
})

export default (models.User as mongoose.Model<any>) || mongoose.model('User', UserSchema)
