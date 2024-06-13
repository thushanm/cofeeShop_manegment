import mongoose from "mongoose";
import  {ObjectId} from "mongodb";


export interface IEmployee extends mongoose.Document {
    name:string;
    email:string;
    address:string;
    age:number;
    contact:string;
    image:string;
}

export interface ICoffee extends mongoose.Document {
    name:string;
    desc:string;
    largeSize:number;
    smallSize:number;
    qty:number;
    image:string;
}

export interface IDessert extends mongoose.Document {
    name:string;
    desc:string;
    size:number;
    price:number;
    qty:number;
    image:string;
}

export interface IOrder extends mongoose.Document {
    _id:string;
    date:Date;
    orderDetails: [IOrderDetail];
}

export interface IOrderDetail extends mongoose.Document{
    productId: string;
    name:string;
    size:string;
    qty:number;
    total:number;
    image: string;
}

