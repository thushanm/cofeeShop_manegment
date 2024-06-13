import express from "express";
import {ICoffee, IDessert, IEmployee} from "../types/schema.types";
import DessertModel from "../models/dessert.model";
import CustomResponse from "../dtos/custom.response";
import fs from "fs";
import path from "path";
import CoffeeModel from "../models/coffee.model";

export const saveDessert = async (req: express.Request, res: any) => {

    try {

        let req_body: IDessert = JSON.parse(req.body.dessert);
        let imageData: Express.Multer.File | undefined = req.file;

        let existingDessert = await DessertModel.findOne({name: req_body.name})
            .catch(reason => {
                console.log(reason)
            });

        if (existingDessert) {
            removeImage(imageData?.filename);
            res.status(401).send(
                new CustomResponse(401, "Dessert already exists !")
            );
            return;
        }

        if (!imageData) {
            res.status(404).send(
                new CustomResponse(404, "Dessert image not found !")
            );
            return;
        }
        const dessertModel = new DessertModel({
            name: req_body.name,
            desc: req_body.desc,
            size: req_body.size,
            price: req_body.price,
            qty: req_body.qty,
            image: imageData?.filename
        });

        await dessertModel.save().then(r => {

            res.status(200).send(
                new CustomResponse(200, "Dessert saved successfully !")
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

        let desserts = await DessertModel.find()/*.limit(size).skip(size * (page - 1));*/

        /*let documentCount: number = await ArticleModel.countDocuments();
        let pageCount: number = Math.ceil(documentCount / size);*/

        res.status(200).send(
            new CustomResponse(
                200,
                "Access",
                desserts, /*pageCount*/ 2)
        );
    } catch (error) {
        res.status(100).send("Error")
    }

}

export const dessertGetById = async (req: express.Request, res: any) => {

    try {

        let _id: string = req.params._id;

        let dessert: any = await DessertModel.findOne({_id: _id})
            .catch(reason => {
                console.log(reason)
            });

        if (!dessert) {
            res.status(404).send(
                new CustomResponse(404, "Dessert not found !")
            )
            return;
        }
        res.status(200).send(
            new CustomResponse(
                200,
                "Access",
                dessert)
        )


    } catch (error) {
        res.status(100).send("Error");
    }
}

export const updateDessert = async (req: express.Request, res: any) => {

    try {

        let req_body: IDessert = JSON.parse(req.body.dessert);
        let imageData: Express.Multer.File | undefined = req.file;

        let duplicateDessert = await DessertModel.findOne({
            name: req_body.name,
            _id: {$ne: req_body._id}
        })
            .catch(reason => {
                console.log(reason)
            });

        if (duplicateDessert) {
            removeImage(imageData?.filename);
            res.status(401).send(
                new CustomResponse(401, "Dessert name already exists !")
            );
            return;
        }

        let existingDessert = await DessertModel.findOne({_id: req_body._id})
            .catch(reason => {
                console.log(reason)
            });

        if (!existingDessert) {
            removeImage(imageData?.filename);
            res.status(404).send(
                new CustomResponse(404, "Dessert not found !")
            );
            return;

        }
        if (!imageData) {
            res.status(404).send(
                new CustomResponse(404, "Dessert image not found !")
            );
            return;
        }
        removeImage(existingDessert.image);

        await DessertModel.findOneAndUpdate({_id: req_body._id}, {
            name: req_body.name,
            desc: req_body.desc,
            size: req_body.size,
            price:req_body.price,
            qty: req_body.qty,
            image: imageData?.filename
        })
            .then(r => {
                res.status(200).send(
                    new CustomResponse(100, "Dessert updated successfully.")
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

export const updateDessertWithoutImage = async (req: express.Request, res: any) => {

    try {

        let req_body: IDessert = req.body;

        let duplicateDessert = await DessertModel.findOne({
            name: req_body.name,
            _id: {$ne: req_body._id}
        })
            .catch(reason => {
                console.log(reason)
            });

        if (duplicateDessert) {
            res.status(401).send(
                new CustomResponse(401, "Dessert name already exists !")
            );
            return;
        }

        let existingDessert = await DessertModel.findOne({_id: req_body._id})
            .catch(reason => {
                console.log(reason)
            });

        if (!existingDessert) {
            res.status(404).send(
                new CustomResponse(404, "Dessert not found !")
            );
            return;
        }
        await DessertModel.findOneAndUpdate({_id: req_body._id}, {
            name: req_body.name,
            desc: req_body.desc,
            size: req_body.size,
            price:req_body.price,
            qty: req_body.qty
        })
            .then(r => {
                res.status(200).send(
                    new CustomResponse(100, "Dessert updated successfully.")
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

export const deleteDessert = async (req: express.Request, res: any) => {

    try {

        let _id = req.params._id;

        let dessert: any = await DessertModel.findOne({_id: _id});

        if (!dessert) {
            res.status(404).send(
                new CustomResponse(404, "Dessert not found !")
            )
            return;
        }

        await DessertModel.deleteOne({_id: _id}).then(r => {

            removeImage(dessert.image);
            res.status(200).send(
                new CustomResponse(200, "Dessert is deleted successfully.")
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

const removeImage = (filename: string | undefined) => {
    console.log('./', 'src\\assets\\images\\' + filename);
    fs.unlinkSync(path.join('./', 'src\\assets\\images\\' + filename));
}
