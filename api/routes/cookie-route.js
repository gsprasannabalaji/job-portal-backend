import express from "express";
import * as cookieController from "../controllers/cookie-controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router?.route("/check-admin-cookie").get(authenticateToken, cookieController?.checkIsAdminCookie);

export default router;