import express from "express";
import * as Middleware from "../middlewares";
import * as CoffeeController from "../controllers/coffee.controller";

const router = express.Router();
/*
Routs
*/
router.post('/', Middleware.verifyToken, Middleware.handleImage, CoffeeController.saveCoffee);

router.get('/getAll', CoffeeController.getAll);

router.put('/', Middleware.verifyToken, Middleware.handleImage, CoffeeController.updateCoffee);

router.put('/withoutImage', Middleware.verifyToken, CoffeeController.updateCoffeeWithoutImage);

router.get('/getById/:_id', CoffeeController.coffeeGetById);

router.delete('/:_id', Middleware.verifyToken, CoffeeController.deleteCoffee);

export default router;
