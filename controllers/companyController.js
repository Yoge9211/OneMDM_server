const Company = require('../models/company')
const Ceo = require('../models/ceo')
const Model = require('../models/model')

// CREATE COMPANY DATA INTO TABLE
module.exports.create = async (req, res) => {
  const { companyName, marketShare, headquarter, ceo, foundedIn } = req.body
  try {
    const company = await Company.create({
      companyName,
      marketShare,
      headquarter,
      foundedIn,
    })
    const companyData = await company.save()

    if (companyData) {
      const ceoName = await Ceo.create({
        ceo,
        company: companyData._id,
      })
      companyData.ceo = ceoName
    }
    companyData.save()
    res.status(200).json({
      success: true,
      data: companyData,
      message: 'Company saved successfully',
    })
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
  }
}

//  DELETE COMPANY WITH ITS CEO HEADQUARTER AND ALL MODELS
module.exports.deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id
    const company = await Company.findById(companyId)
      .populate('ceo')
      .populate('models')
    if (company) {
      await Ceo.deleteOne({ company: companyId })
      await Model.deleteMany({ company: companyId })
      await Company.findByIdAndDelete(companyId)
      return res.status(200).json({
        message: 'Company deleted Successfully!!',
        success: true,
      })
    }
    return res.status(200).json({
      success: false,
      message: 'Company could not be find by mentioned id',
    })
  } catch (error) {
    res.send(error.message)
  }
}

// GET ALL COMPANIES
module.exports.getAllCompanies = async (req, res) => {
  const companies = await Company.find().populate('ceo')
  res.send(companies)
}

// GET ALL MODELS OF SPECIFIC COMPANY
module.exports.viewCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id
    const company = await Company.findById(companyId).populate('models')
    return res.status(200).json({
      success: true,
      data: company.models,
      message: 'All Models Fetched successfully',
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      data: [],
      message: 'Failed to fetch all models',
    })
  }
}

// GET SINGLE COMPANY BY ID
module.exports.getCompany = async (req, res) => {
  try {
    const companyId = req.params.id
    const companyData = await Company.findById(companyId).populate('ceo')
    return res.status(200).json({
      success: true,
      data: companyData,
      message: 'Company Data fetched successfully',
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      data: [],
      message: 'something went wrong',
    })
  }
}

// UPDATE COMPANY DETAILS
module.exports.updateCompany = async (req, res) => {
  const id = req.params.id
  const { companyName, marketShare, headquarter, ceo, foundedIn } = req.body
  const updatedCompanyData = await Company.findByIdAndUpdate(
    id,
    {
      $set: {
        companyName,
        marketShare,
        headquarter,
        foundedIn,
      },
    },
    {},
  )
  return res.status(201).json({
    success: true,
    data: updatedCompanyData,
    message: 'Car Model updated successfully',
  })
}
