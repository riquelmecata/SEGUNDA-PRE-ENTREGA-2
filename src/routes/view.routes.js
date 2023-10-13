import { Router } from 'express';
import { product as dbInstance} from "./product.routes.js";
import { carts as dbCart } from './carts.routes.js';
import ProductManager from "../dao/mongomanagers/productManagerMongo.js"

const pmanager=new ProductManager()

// Importar todos los routers;
export const ViewRouter = Router();

ViewRouter.get("/products", async (req, res) => {

    try {
        const { limit, page, sort } = req.query
        let on = await dbInstance.getProducts(limit, page, sort)
        let productos = JSON.parse(JSON.stringify(on))
        console.log(productos)
        res.render("products", {
            hasNextPage: productos.hasNextPage,
            hasPrevPage: productos.hasPrevPage,
            nextLink: productos.nextLink ? `http://localhost:8080/products?page=${productos.page + 1}&limit=${limit?limit:10}` : null,
            prevLink: productos.prevLink ? `http://localhost:8080/products?page=${productos.page - 1}&limit=${limit?limit:10}` : null,
            productos: productos.payload,
            
        })
    } catch (e) {
        res.send(500).json({ error: e })
    }
})
ViewRouter.get("/products/:pid", async (req, res) => {

    try {
        const { pid } = req.params
        let on = await dbInstance.getProductById(pid)
        let productos = JSON.parse(JSON.stringify(on))
        console.log(productos)
        res.render("detail", {
            producto: productos
        })
    } catch (e) {
        res.send(500).json({ error: e })
    }
})

ViewRouter.get("/carts/:cid", async (req, res) => {

    try {
        const { cid } = req.params
        let on = await dbCart.getCartById(cid)
        let productos = JSON.parse(JSON.stringify(on))
        console.log(productos.products)
        res.render("carts", {
            productos: productos.products
        })
    } catch (e) {
        res.send(500).json({ error: e })
    }
})