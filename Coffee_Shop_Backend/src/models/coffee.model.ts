import mongoose from "mongoose";
import * as SchemaTypes from "../types/schema.types";

const CoffeeSchema =  new mongoose.Schema<SchemaTypes.ICoffee>({
    name:{type: String, required: true},
    desc:{type: String, required: true},
    largeSize:{type: Number, required: true},
    smallSize:{type: Number, required: true},
    qty:{type: Number, required: true},
    image:{type: String, required: true}
});

const CoffeeModel = mongoose.model('Coffee', CoffeeSchema);

export default CoffeeModel;
