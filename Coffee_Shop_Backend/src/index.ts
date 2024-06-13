
//import
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import * as process from "process";
import EmployeeRouts from "./routes/employee.routes"
import CoffeeRouts from "./routes/coffee.routes"
import DessertRouts from "./routes/dessert.routes"
import OrderRouts from "./routes/order.routes"
import DashboardRouts from "./routes/dashboard.routes"



//invoked
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.static('src/assets'))

app.use(cors({
    origin: "*"
}));

//connect database
mongoose.connect(process.env.MONGO_URL as string);
// mongoose.connect('mongodb://localhost/blog');

const db = mongoose.connection;


db.on( 'error', (error) => {
    console.log("DB Connection Error : ", error);
});

db.on( 'open', () => {
    console.log("DB Connected Successfully");
});



//routes

app.use('/employee', EmployeeRouts);
app.use('/coffee', CoffeeRouts);
app.use('/dessert', DessertRouts);
app.use('/order', OrderRouts);
app.use('/dashboard', DashboardRouts);



app.listen(8080, () => {
    console.log('Server start on port 8080');
});
