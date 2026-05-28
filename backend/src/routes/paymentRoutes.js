const express = require('express');
const router = express.Router();

const {
  createPayment,
  getPaymentByOrder,
  updatePaymentStatus
} = require('../controllers/paymentController');

router.post('/', createPayment);

router.get('/:orderId', getPaymentByOrder);

router.put('/:id/status', updatePaymentStatus);

module.exports = router;