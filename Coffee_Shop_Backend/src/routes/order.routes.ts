import express from "express";
import * as Middleware from "../middlewares";
import * as OrderController from "../controllers/order.controller"


const router = express.Router();

/*
Routs
*/

router.get('/getNextId', Middleware.verifyToken, OrderController.getNextOrderId);

router.post('/', Middleware.verifyToken, OrderController.saveOrder);

router.get('/getAll', Middleware.verifyToken, OrderController.getAll);

/*router.put('/', Middleware.verifyToken, OrderController.updateOrder);

router.get('/getById/:_id', OrderController.orderGetById);

router.delete('/:_id', Middleware.verifyToken, OrderController.deleteOrder);*/

export default router;
