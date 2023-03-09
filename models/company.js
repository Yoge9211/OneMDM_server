const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    marketShare: {
      type: Number,
      required: true,
    },
    headquarter: {
      type: String,
      required: true,
    },
    ceo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ceo',
    },
    foundedIn: {
      type: Number,
      required: true,
    },
    models: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'model',
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('company', CompanySchema)
