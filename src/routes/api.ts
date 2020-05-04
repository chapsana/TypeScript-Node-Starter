import express from "express";
const router = express.Router();

import * as apiController from "../controllers/api";


/**
 * API examples routes.
 */
router.get("/api", apiController.getApi);

export default router;
