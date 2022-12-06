import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)
export default UserModel
