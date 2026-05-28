const express = require('express');
const router = express.Router();

const {
  getRestaurants,
  getRestaurantMenus,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getRestaurants);
router.get('/:id/menu', getRestaurantMenus);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  createRestaurant
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  updateRestaurant
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteRestaurant
);

module.exports = router;