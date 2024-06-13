import mongoose from "mongoose";
import * as SchemaTypes from "../types/schema.types";

const DessertSchema =  new mongoose.Schema<SchemaTypes.IDessert>({
    name:{type: String, required: true},
    desc:{type: String, required: true},
    size:{type: Number, required: true},
    price:{type: Number, required: true},
    qty:{type: Number, required: true},
    image:{type: String, required: true}
});

const DessertModel = mongoose.model('Dessert', DessertSchema);

export default DessertModel;
