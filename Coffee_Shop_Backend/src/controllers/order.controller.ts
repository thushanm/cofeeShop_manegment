import express from "express";
import CustomResponse from "../dtos/custom.response";
import OrderModel from "../models/order.model";
import {IOrderDetail} from "../types/schema.types";

export const getNextOrderId = async (req: express.Request, res: any) => {

    try {

        OrderModel.findOne().sort({ _id: -1 })
            .then(lastInsertedOrder => {
                if (lastInsertedOrder) {

                    const lastIdNumericPart = parseInt(lastInsertedOrder._id.split('-')[1], 10);
                    let nextId = lastIdNumericPart + 1;
                    const formattedNextId = `ORD-${nextId.toString().padStart(8, '0')}`;
                    res.status(200).send(
                        new CustomResponse(
                            200,
                            "Access",
                            formattedNextId

                        )
                    )
                    return;
                }

                res.status(200).send(
                    new CustomResponse(
                        200,
                        "Access",
                        "ORD-00000001"
                    )
                )
            })
            .catch(error => {
                res.status(500).send(
                    new CustomResponse(
                        500,
                        error._message
                    )
                )
            });

    } catch (Error) {
        res.status(100).send("Error");
    }
}

export const saveOrder = async (req: express.Request, res: any) => {

    try {

        let req_body = req.body;

        const orderDetailsArray:IOrderDetail[] = [];

        req_body.orderDetails.forEach((orderDetails:IOrderDetail) => {

            const orderDetailModel:IOrderDetail = <IOrderDetail>{
                productId: orderDetails.productId,
                name: orderDetails.name,
                size: orderDetails.size,
                qty: orderDetails.qty,
                total: orderDetails.total,
                image: orderDetails.image
            };
            orderDetailsArray.push(orderDetailModel);
        });

        const orderModel = new OrderModel({
            _id: req_body._id,
            orderDetails:orderDetailsArray
        });

        orderModel.save().then(response => {
            res.status(200).send(
                new CustomResponse(
                    200,
                    "Your order successfully saved !")
            );
        }).catch(reason => {
            console.log(reason)
            res.status(500).send(
                new CustomResponse(
                    500,
                    reason._message)
            );
        });

    } catch (error){
        res.status(100).send("Error");
    }
}

export const getAll = async (req: express.Request, res: any) => {


    try {

        /*let req_query: any = req.query;

        let size: number = req_query.size;
        let page: number = req_query.page;*/

        let orders = await OrderModel.find()/*.limit(size).skip(size * (page - 1));*/

        //let documentCount: number = await ArticleModel.countDocuments();
        //let pageCount: number = Math.ceil(documentCount / size);

        res.status(200).send(
            new CustomResponse(
                200,
                "Access",
                orders, /*pageCount*/ 2)
        );
    } catch (error) {
        res.status(100).send("Error")
    }

}

export const orderGetById = async (req: express.Request, res: any) => {

    try {

        let _id: string = req.params._id;

        /*let employee: any = await EmployeeModel.findOne({_id: _id});

        if (!employee) {
            res.status(404).send(
                new CustomResponse(404, "Employee not found !")
            )
            return;
        }
        res.status(200).send(
            new CustomResponse(
                200,
                "Access",
                employee)
        )*/


    } catch (error) {
        res.status(100).send("Error");
    }
}

export const updateOrder = async (req: express.Request, res: any) => {

    try {

        //let req_body: IEmployee = JSON.parse(req.body.employee);
        //let imageData: Express.Multer.File | undefined = req.file;

        /*let duplicateEmployee = await EmployeeModel.findOne({
            email: req_body.email,
            _id:{$ne: req_body._id}
        })
            .catch(reason => {
                console.log(reason)
            });

        if (duplicateEmployee) {
            removeImage(imageData?.filename);
            res.status(401).send(
                new CustomResponse(401, "Employee email already exists !")
            );
            return;
        }

        let existingEmployee = await EmployeeModel.findOne({_id: req_body._id})
            .catch(reason => {
                console.log(reason)
            });

        if (!existingEmployee) {
            removeImage(imageData?.filename);
            res.status(404).send(
                new CustomResponse(404, "Employee not found !")
            );
            return;

        }
        if (!imageData) {
            res.status(404).send(
                new CustomResponse(404, "Employee image not found !")
            );
            return;
        }
        removeImage(existingEmployee.image);

        await EmployeeModel.findOneAndUpdate({_id: req_body._id}, {
            name: req_body.name,
            email: req_body.email,
            address: req_body.address,
            age: req_body.age,
            contact: req_body.contact,
            image: imageData?.filename
        })
            .then(r => {
                res.status(200).send(
                    new CustomResponse(100, "Employee updated successfully.")
                )
            }).catch(error => {
                console.log(error)
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            });*/

    } catch (error) {
        res.status(100).send("error");
    }
}

export const deleteOrder = async (req: express.Request, res: any) => {

    try {

        /*let _id = req.params._id;

        let employee: any = await EmployeeModel.findOne({_id: _id});

        if (!employee) {
            res.status(404).send(
                new CustomResponse(404, "Employee not found !")
            )
            return;
        }

        await EmployeeModel.deleteOne({_id: _id}).then(r => {

            removeImage(employee.image);
            res.status(200).send(
                new CustomResponse(200, "Employee is deleted successfully.")
            )
        }).catch(e => {
            res.status(100).send(
                new CustomResponse(100, "Something went wrong.")
            )
        })*/
    } catch (error) {
        res.status(100).send("Error");
    }
}
