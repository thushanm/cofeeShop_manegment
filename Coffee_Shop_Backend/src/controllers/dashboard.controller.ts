import express from "express";
import CoffeeModel from "../models/coffee.model";
import DessertModel from "../models/dessert.model";
import OrderModel from "../models/order.model";
import EmployeeModel from "../models/employee.model";
import CustomResponse from "../dtos/custom.response";

export let getMonthlyRevenue = async (req: express.Request, res: any) => {

    try {

        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        let monthlyRevenue: number = 0;

        const result = await OrderModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfMonth,
                        $lt: endOfMonth,
                    }
                }
            },
            {
                $addFields: {
                    totalSum: {
                        $sum: "$orderDetails.total"
                    }
                }
            }
        ]).exec();

        result.map(value => monthlyRevenue += value.totalSum);

        res.status(200).send(
            new CustomResponse(200, "Access", monthlyRevenue)
        );

    }catch (error){
        res.status(500).send("Error");
    }
}


export let getStatic = async (req: express.Request, res: any) => {

    try {

        let totRevenue:number = 0;
        let orderCount:number = 0;
        let dessertCount:number = 0;
        let coffeeCount:number = 0;
        let employeeCount:number = 0;

         await OrderModel.countDocuments()
            .then(res => {
                orderCount = res;
            })
            .catch(reason => {
                console.log(reason)
            });
        await DessertModel.countDocuments()
            .then(res => {
                dessertCount = res;
            })
            .catch(reason => {
                console.log(reason)
            });
        await CoffeeModel.countDocuments()
            .then(res => {
                coffeeCount = res;
            })
            .catch(reason => {
                console.log(reason)
            });
        await EmployeeModel.countDocuments()
            .then(res => {
                employeeCount = res;
            })
            .catch(reason => {
                console.log(reason)
            });

        const result = await OrderModel.aggregate([
            {
                $addFields: {
                    totalSum: {
                        $sum: "$orderDetails.total"
                    }
                }
            }
        ]).exec();

        result.map(value => totRevenue += value.totalSum);

        res.status(200).send(
            new CustomResponse(200, "Access", [orderCount, employeeCount, dessertCount + coffeeCount, totRevenue])
        );

    }catch (error){
        res.status(500).send("Error");
    }
};
