import { Router } from "express";
import {
  generateRazorpayOrder,
  generateStripeOrder,
  getOrderById,
  getOrderListAdmin,
  updateOrderStatus,
  verifyRazorpayPayment,
} from "../../../controllers/apps/ecommerce/order.controllers.js";
import { isAdmin, verifyJWT } from "../../../middlewares/auth.middlewares.js";
import {
  orderPathVariableValidator,
  orderUpdateStatusValidator,
  verifyRazorpayPaymentValidator,
} from "../../../validators/ecommerce/order.validators.js";
import { validate } from "../../../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/provider/razorpay").post(generateRazorpayOrder);
router.route("/provider/stripe").post(generateStripeOrder);

router
  .route("/provider/razorpay/verify-payment")
  .post(verifyRazorpayPaymentValidator(), validate, verifyRazorpayPayment);

router
  .route("/:orderId")
  .get(orderPathVariableValidator(), validate, getOrderById);

router.route("/list/admin").get(isAdmin, getOrderListAdmin);

router
  .route("/status/:orderId")
  .patch(
    isAdmin,
    orderPathVariableValidator(),
    orderUpdateStatusValidator(),
    validate,
    updateOrderStatus
  );

export default router;
