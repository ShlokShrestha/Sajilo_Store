const express = require("express");
const router = express.Router();
const { isAuthenitcatedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

router.route("/order/new").post(isAuthenitcatedUser, newOrder);
router.route("/order/:id").get(isAuthenitcatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenitcatedUser, myOrder);

router
  .route("/admin/orders")
  .get(isAuthenitcatedUser, authorizedRoles("admin"), getAllOrder);
router
  .route("/admin/order/:id")
  .put(isAuthenitcatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenitcatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
