import express from "express";
import {ICoffee} from "../types/schema.types";
import CustomResponse from "../dtos/custom.response";
import fs from "fs";
import path from "path";
import CoffeeModel from "../models/coffee.model";

export const saveCoffee = async (req: express.Request, res: any) => {

    try {

        let req_body: ICoffee = JSON.parse(req.body.coffee);
        let imageData: Express.Multer.File | undefined = req.file;

        let existingCoffee = await CoffeeModel.findOne({name: req_body.name})
            .catch(reason => {
                console.log(reason)
            });

        if (existingCoffee) {

            removeImage(imageData?.filename);
            res.status(401).send(
                new CustomResponse(401, "Coffee name already exists !")
            );
            return;
        }

        if (!imageData) {
            res.status(404).send(
                new CustomResponse(404, "Coffee image not found !")
            );
            return;
        }

        const coffeeModel = new CoffeeModel({
            name: req_body.name,
            desc: req_body.desc,
            largeSize: req_body.largeSize,
            smallSize: req_body.smallSize,
            qty: req_body.qty,
            image: imageData?.filename
        });

        await coffeeModel.save().then(r => {

            res.status(200).send(
                new CustomResponse(200, "Coffee saved successfully !")
            )
        }).catch(e => {

            removeImage(imageData?.filename);
            res.status(500).send(
                new CustomResponse(500, e._message)
            )
        });

    } catch (error) {
        res.status(100).send("Error");
    }
}

export const getAll = async (req: express.Request, res: any) => {


    try {

        /*let req_query: any = req.query;

        let size: number = req_query.size;
        let page: number = req_query.page;*/

        let coffees = await CoffeeModel.find()/*.limit(size).skip(size * (page - 1));*/

        /*let documentCount: number = await ArticleModel.countDocuments();
        let pageCount: number = Math.ceil(documentCount / size);*/

        res.status(200).send(
            new CustomResponse(
                200,
                "Access",
                coffees, /*pageCount*/ 2)
        );
    } catch (error) {
        res.status(100).send("Error")
    }

}

export const coffeeGetById = async (req: express.Request, res: any) => {

    try {

        let _id: string = req.params._id;

        let coffee = await CoffeeModel.findOne({_id: _id})
            .catch(reason => {
                console.log(reason)
            });

        if (!coffee) {
            res.status(404).send(
                new CustomResponse(404, "Coffee not found !")
            );
            return;
        }
        res.status(200).send(
            new CustomResponse(
                200,
                "Access",
                coffee)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}

export const updateCoffee = async (req: express.Request, res: any) => {

    try {

        let req_body: ICoffee = JSON.parse(req.body.coffee);
        let imageData: Express.Multer.File | undefined = req.file;

        let duplicateCoffee = await CoffeeModel.findOne({
            name: req_body.name,
            _id: {$ne: req_body._id}
        })
            .catch(reason => {
                console.log(reason)
            });

        if (duplicateCoffee) {
            removeImage(imageData?.filename);
            res.status(401).send(
                new CustomResponse(401, "Coffee name already exists !")
            );
            return;
        }

        let existingCoffee = await CoffeeModel.findOne({_id: req_body._id})
            .catch(reason => {
                console.log(reason)
            });

        if (!existingCoffee) {
            removeImage(imageData?.filename);
            res.status(404).send(
                new CustomResponse(404, "Coffee not found !")
            );
            return;
        }
        if (!imageData) {
            res.status(404).send(
                new CustomResponse(404, "Coffee image not found !")
            );
            return;
        }
        removeImage(existingCoffee.image);

        await CoffeeModel.findOneAndUpdate({_id: req_body._id}, {
            name: req_body.name,
            desc: req_body.desc,
            largeSize: req_body.largeSize,
            smallSize: req_body.smallSize,
            qty: req_body.qty,
            image: imageData?.filename
        })
            .then(r => {
                res.status(200).send(
                    new CustomResponse(100, "Coffee updated successfully.")
                )
            }).catch(error => {
                console.log(error)
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            });

    } catch (error) {
        res.status(100).send("error");
    }
}

export const updateCoffeeWithoutImage = async (req: express.Request, res: any) => {

    try {

        let req_body: ICoffee = req.body;

        let duplicateCoffee = await CoffeeModel.findOne({
            name: req_body.name,
            _id: {$ne: req_body._id}
        })
            .catch(reason => {
                console.log(reason)
            });


        if (duplicateCoffee) {

            //removeImage(imageData?.filename);
            res.status(401).send(
                new CustomResponse(401, "Coffee name already exists !")
            );
            return;
        }

        let existingCoffee = await CoffeeModel.findOne({_id: req_body._id})
            .catch(reason => {
                console.log(reason)
            });

        if (!existingCoffee) {
            res.status(404).send(
                new CustomResponse(404, "Coffee not found !")
            );
            return;
        }
        await CoffeeModel.findOneAndUpdate({_id: req_body._id}, {
            name: req_body.name,
            desc: req_body.desc,
            largeSize: req_body.largeSize,
            smallSize: req_body.smallSize,
            qty: req_body.qty
        })
            .then(r => {
                res.status(200).send(
                    new CustomResponse(100, "Coffee updated successfully.")
                )
            }).catch(error => {
                console.log(error)
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            });
    } catch (error) {
        res.status(100).send("error");
    }
}

export const deleteCoffee = async (req: express.Request, res: any) => {

    try {

        let _id = req.params._id;

        let coffee: any = await CoffeeModel.findOne({_id: _id});

        if (!coffee) {
            res.status(404).send(
                new CustomResponse(404, "Coffee not found !")
            )
            return;
        }

        await CoffeeModel.deleteOne({_id: _id}).then(r => {

            removeImage(coffee.image);
            res.status(200).send(
                new CustomResponse(200, "Coffee is deleted successfully.")
            )
        }).catch(e => {
            res.status(100).send(
                new CustomResponse(100, "Something went wrong.")
            )
        })
    } catch (error) {
        res.status(100).send("Error");
    }
}

export const updateCoffeeQty = async (_id: string, _qty: number) => {

    /* try {

         await CoffeeModel.findOneAndUpdate({_id: req_body._id}, {
             qty: ,
         })

         }).catch(e => {
             res.status(100).send(
                 new CustomResponse(100, "Something went wrong.")
             )
         })
     } catch (error) {
         res.status(100).send("Error");
     }*/
}

const removeImage = (filename: string | undefined) => {
    console.log('./', 'src\\assets\\images\\' + filename);
    fs.unlinkSync(path.join('./', 'src\\assets\\images\\' + filename));
}
