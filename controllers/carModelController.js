const Company = require('../models/company')
const CarModel = require('../models/model')

module.exports.createCarModel = async (req, res) => {
  try {
    const { modelName, length, width, seatingCapacity, companyId } = req.body
    const model = await CarModel.create({
      modelName,
      length,
      width,
      seatingCapacity,
      company: companyId,
    })
    model.save()
    if (model) {
      let company = await Company.findById(companyId)
      company.models.push(model)
      company.save()
      res.status(200).json({
        success: true,
        message: 'Model saved successfully',
        data: model,
      })
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
  }
}

module.exports.getAllModels = async (req, res) => {
  const companyId = req.params.id
  const company = await Company.findById(companyId).populate('models')
  //   const companyModels = company.populate('models')
  res.send(company.models)
}

// DELETE MODEL
module.exports.deleteModel = async (req, res) => {
  try {
    const modelId = req.params.id
    const model = await CarModel.findById(modelId)

    await Company.findByIdAndUpdate(model.company, {
      $pull: { models: modelId },
    })
    await CarModel.findByIdAndDelete(modelId)
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Car Model Deleted Successfully!!',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    })
  }
}

// UPDATE CARS MODEL
module.exports.updateModel = async (req, res) => {
  const id = req.params.id
  try {
    const updatedModel = await CarModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    return res.status(201).json({
      success: true,
      data: updatedModel,
      message: 'Car Model updated successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    })
  }
}

// GET SINGLE MODEL DETAILS BY ID
module.exports.getModelDetail = async (req, res) => {
  try {
    const id = req.params.id
    const modelDetail = await CarModel.findById(id)
    return res.status(200).json({
      success: true,
      data: modelDetail,
      message: 'Model Detail Fetched successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    })
  }
}
