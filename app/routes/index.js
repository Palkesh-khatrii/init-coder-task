
import express from 'express'
const router = express.Router();
import user from './user.routes';
import product from './product.routes';
import category from './category.routes';


router.use('/user', user);
router.use('/category', category);
router.use('/product', product);


module.exports = router