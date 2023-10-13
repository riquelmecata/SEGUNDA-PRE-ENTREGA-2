import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import "./dao/dbConfig.js"

import { ViewRouter } from "./routes/view.routes.js";
import ProductRouter from "./routes/product.routes.js"
import { product } from "./routes/product.routes.js";
import CartRouter from "./routes/carts.routes.js"
import ProductManager from "./dao/mongomanagers/productManagerMongo.js"

/*
import { router as ProductRouter,dbM } from "./routes/api/product.router.js"
import { router as CartRouter} from "./routes/api/cart.router.js"
import { router as viewsRouter } from "./routes/views.router.js"
//import MessageManager from "./Dao/MessagesManager.js"; */


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

//Api Routes
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);



// Views routes
app.use('/', ViewRouter);
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("Andando en puerto " + PORT)
})


httpServer