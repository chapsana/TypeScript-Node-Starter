import express from "express";
import webRoute from "./web";
import apiRoute from "./api";

const router = express.Router();

router.use("/", webRoute);
router.use("/api", apiRoute);

export default router;
