import mongoose, {SchemaType} from "mongoose";
import * as SchemaTypes from "../types/schema.types"


const EmployeeSchema =  new mongoose.Schema<SchemaTypes.IEmployee>({
    name:{type: String, required: true},
    email:{type: String, required: true},
    address:{type: String, required: true},
    age:{type: Number, required: true},
    contact:{type: String, required: true},
    image:{type: String, required: true}
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

export default EmployeeModel;
