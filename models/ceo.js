const mongoose = require('mongoose')

const CeoSchema = new mongoose.Schema(
  {
    ceo: {
      type: String,
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
module.exports = mongoose.model('ceo', CeoSchema)
