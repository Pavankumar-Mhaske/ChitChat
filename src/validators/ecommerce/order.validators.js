import { body, param } from "express-validator";
import { OrderStatusEnum } from "../../constants.js";

const verifyRazorpayPaymentValidator = () => {
  return [
    body("razorpay_order_id")
      .trim()
      .notEmpty()
      .withMessage("Razorpay order id is missing"),
    body("razorpay_payment_id")
      .trim()
      .notEmpty()
      .withMessage("Razorpay payment id is missing"),
    body("razorpay_signature")
      .trim()
      .notEmpty()
      .withMessage("Razorpay signature is missing"),
    body("addressId")
      .trim()
      .notEmpty()
      .isMongoId()
      .withMessage("Invalid address id"),
  ];
};

const orderPathVariableValidator = () => {
  return [
    param("orderId").notEmpty().isMongoId().withMessage("Invalid order id"),
  ];
};

const orderUpdateStatusValidator = () => {
  return [
    body("status")
      .trim()
      .notEmpty()
      .isIn(Object.values(OrderStatusEnum))
      .withMessage("Invalid order status"),
  ];
};

export {
  verifyRazorpayPaymentValidator,
  orderPathVariableValidator,
  orderUpdateStatusValidator,
};
