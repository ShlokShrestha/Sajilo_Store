const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReview,
  deleteReview,
  getAdminProducts,
} = require("../controller/productController");
const { isAuthenitcatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

//User route
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenitcatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReview)
  .delete(isAuthenitcatedUser, deleteReview);

//Admin Route
router
  .route("/admin/product/new")
  .post(isAuthenitcatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/admin/products")
  .get(isAuthenitcatedUser, authorizedRoles("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenitcatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenitcatedUser, authorizedRoles("admin"), deleteProduct);

module.exports = router;
