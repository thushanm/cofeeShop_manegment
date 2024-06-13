import express from "express";
import * as EmployeeController from "../controllers/employee.controller"
import * as Middleware from "../middlewares/index"
// import {upload} from "../middlewares/index";
// import {upload} from "../middlewares/index";


const router = express.Router();

/*
Routs
*/
router.post('/', Middleware.verifyToken, Middleware.handleImage, EmployeeController.saveEmployee);

router.get('/getAll', EmployeeController.getAll);

router.put('/', Middleware.verifyToken, Middleware.handleImage, EmployeeController.updateEmployee);

router.put('/withoutImage', Middleware.verifyToken, EmployeeController.updateEmployeeWithoutImage);

router.get('/getById/:_id', EmployeeController.employeeGetById);

router.delete('/:_id', Middleware.verifyToken, EmployeeController.deleteEmployee);


export default router;
