import 'server-only'
import { dbConnect } from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function createUser(
  email: string,
  password: string,
  role = 'staff'
) {
  await dbConnect()

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({ email, password: hashedPassword, role })
  await user.save()

  return { id: user._id.toString(), email: user.email, role: user.role }
}
