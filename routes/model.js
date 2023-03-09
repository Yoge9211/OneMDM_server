const express = require('express')
const router = express.Router()
const CreateCarModelController = require('../controllers/carModelController')

router.post('/create-model', CreateCarModelController.createCarModel)
router.get('/get-all-models/:id', CreateCarModelController.getAllModels)
router.delete('/delete-model/:id', CreateCarModelController.deleteModel)
router.patch('/update-model/:id', CreateCarModelController.updateModel)
router.get('/get-one-model/:id', CreateCarModelController.getModelDetail)
module.exports = router
