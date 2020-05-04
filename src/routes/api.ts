import express from "express";
const router = express.Router();

import * as apiController from "../controllers/api";
import * as passportConfig from "../config/passport";

/**
 * API examples routes.
 */
router.get("/api", apiController.getApi);
router.get(
  "/api/facebook",
  passportConfig.isAuthenticated,
  passportConfig.isAuthorized,
  apiController.getFacebook
);


export default router;
