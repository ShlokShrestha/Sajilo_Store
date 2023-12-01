const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenitcatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resources", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET); //decodedData.id is id set by jwttoken at time of creation

  req.user = await User.findById(decodedData.id); //whenever  we login use can access the user data in backend like id, email ,name
  next();
});

//admin authorized access only
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resources`,
          403
        )
      );
    }
    next();
  };
};
