import express from "express";

import * as userDetailsController from "../controllers/user-details-controller.js";
import validateEmail from "../middlewares/validateEmail.js";
import validatePassword from "../middlewares/validatePassword.js";
import validateFullName from "../middlewares/validateFullName.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.route("/getAll").get(userDetailsController.getUser);

router
  .route("/create")
  .post(
    validateEmail,
    validatePassword,
    validateFullName,
    userDetailsController.createUser
  );

router
  .route("/edit")
  .put(
    validateEmail,
    validatePassword,
    validateFullName,
    userDetailsController.updateUser
  );

router.route("/delete").delete(userDetailsController.deleteUser);

router.route("/uploadImage").post(userDetailsController.uploadImage);

router.route("/getImage/:email").get(authenticateToken, userDetailsController.getImage);

router.route('/login').post(validateEmail, validatePassword, userDetailsController.login);

export default router;
