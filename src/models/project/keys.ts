import mongoose from 'mongoose'

const keysSchema = new mongoose.Schema({
  private: String,
  public: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
})

export const Keys = mongoose.models.Keys || mongoose.model('Keys', keysSchema)
