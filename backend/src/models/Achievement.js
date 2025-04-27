import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const achievementSchema = new Schema(
  {
    mentee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementText: {
      type: String,
      required: true,
      trim: true,
    },
    fileData: {
      type: Buffer, // Store the file data as a buffer
      default: null,
    },
    mimeType: {
      type: String, // Store the MIME type of the file
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Achievement = model('Achievement', achievementSchema);

export default Achievement;