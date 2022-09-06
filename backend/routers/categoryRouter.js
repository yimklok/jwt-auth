import express from 'express'
import categoryCtrl from '../controllers/CategoryContr.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'
const router = express.Router()

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth,authAdmin,categoryCtrl.createCategory)
router.route('/category/:id')
    .delete(categoryCtrl.deleteCategory)
    .put(categoryCtrl.updateCategory)

export default router
