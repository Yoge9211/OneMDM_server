const mongoose = require('mongoose')

const CarModelSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('model', CarModelSchema)
