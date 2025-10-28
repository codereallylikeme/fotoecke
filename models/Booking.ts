import mongoose, { Schema, Document, models } from 'mongoose'

export interface IBooking extends Document {
  name: string
  email: string
  date: Date
  eventType: string
  status?: string
  createdAt: Date
}

const BookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email'],
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => {
          // normalize to local date (ignore time part) so "today" is allowed
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const d = new Date(value)
          d.setHours(0, 0, 0, 0)
          return d >= today
        },
        message: 'Event date must be today or in the future',
      },
    },
    eventType: {
      type: String,
      required: true,
      // use lowercase / simple keys to match client <option value="">
      enum: ['wedding', 'birthday', 'corporate', 'other'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default (models.Booking as mongoose.Model<IBooking>) ||
  mongoose.model<IBooking>('Booking', BookingSchema)
