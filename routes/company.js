const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companyController')

router.get('/', function (req, res) {
  res.send('server is listening')
})
router.get('/companies', companyController.getAllCompanies)
router.post('/create-company', companyController.create)
router.post(
  '/create-company-with-models',
  companyController.createCompanyWithModel,
)

router.delete('/delete-company/:id', companyController.deleteCompany)
router.get('/view/companyModels/:id', companyController.viewCompanyById)
router.get('/get-company/:id', companyController.getCompany)
router.patch('/update-company/:id', companyController.updateCompany)
module.exports = router
