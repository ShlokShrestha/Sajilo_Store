const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenitcatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenitcatedUser, getUserDetails);
router.route("/password/update").put(isAuthenitcatedUser, updatePassword);
router.route("/me/update").put(isAuthenitcatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenitcatedUser, authorizedRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenitcatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenitcatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenitcatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
