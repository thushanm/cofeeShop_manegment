import express from "express";
import * as Middleware from "../middlewares";
import * as DashboardController from "../controllers/dashboard.controller";


const router = express.Router();

router.get('/getStatic', Middleware.verifyToken, Middleware.handleImage, DashboardController.getStatic);

router.get('/get-monthly/revenue', Middleware.verifyToken, Middleware.handleImage, DashboardController.getMonthlyRevenue);

export default router;
