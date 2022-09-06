import express from 'express'
import path from 'path'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'
import productCtrl from '../controllers/productCtrl.js'

const router = express.Router()

router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)


router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)

export default router