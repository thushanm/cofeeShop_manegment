import mongoose from "mongoose";
import * as SchemaTypes from "../types/schema.types";

const OrderDetailSchema = new mongoose.Schema<SchemaTypes.IOrderDetail>({
    productId:{type: String, required: true},
    name:{type: String, required: true},
    size:{type: String , required: true},
    qty:{type: Number, required: true},
    total:{type: Number, required: true},
    image:{type: String, required: true}
});

const OrderSchema = new mongoose.Schema<SchemaTypes.IOrder>({
    _id:{type: String, required: true, unique: true },
    date:{type: Date, default:Date.now},
    orderDetails:{type: [OrderDetailSchema], required:true},
});

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
