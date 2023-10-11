import { Router } from "express";
import CartManager from "../dao/mongomanagers/cartManagerMongo.js";
import ProductManager from "../dao/mongomanagers/productManagerMongo.js"

const CartRouter = Router()
const carts = new CartManager
const pm = new ProductManager()

/* CartRouter.post("/carts", async (req, res) => {
    res.send(await carts.addCarts());
}) */

CartRouter.post("/carts", async (req, res) => {
    try {
        const { products } = req.body;
  
        if (!Array.isArray(products)) {
            return res.status(400).send('Invalid request: products must be an array');
        }
  
        const validProducts = [];
  
        for (const product of products) {
            const checkId = await pm.getProductById(product._id);
            if (checkId === null) {
                return res.status(404).send(`Product with id ${product._id} not found`);
            }
            validProducts.push(checkId);
        }
  
        let cart = await carts.addCart(validProducts);
        res.status(200).send(cart);
  
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
  });
  

/* CartRouter.get('/carts', async (req, res) => {
    res.send(await carts.readCarts())
})  */

CartRouter.get("/carts",async(req,res)=>{
    let carrito=await carts.getCarts()
    res.json({carrito})
 })

/* CartRouter.get('/carts/:cid', async (req, res) => {
    res.send(await carts.getCartsById(req.params.id))
}) */

CartRouter.get("/carts/:cid",async(req,res)=>{
    let carritofound=await carts.getCartbyId(req.params)
    res.json({status:"success",carritofound})
})

/* CartRouter.post('/carts/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    res.send(await carts.addProductToCart(cartId, productId))
}) */

CartRouter.post("/carts/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const checkIdProduct = await pm.getProductById(pid);
      if (!checkIdProduct) {
        return res.status(404).send({ message: `Producto con el ID: ${pid} no encontrado` });
      }
  
      const checkIdCart = await cm.getCartById(cid);
      if (!checkIdCart) {
        return res.status(404).send({ message: `Producto con el ID: ${cid} no encontrado` });
      }
  
      const result = await cm.addProductInCart(cid, { _id: pid, quantity:quantity });
      console.log(result);
      return res.status(200).send({
        message: `Producto con el ID: ${pid} añadido al carrito con el ID: ${cid}`,
        cart: result,
      });
    } catch (error) {
      console.error("Ocurrió un error:", error);
      return res.status(500).send({ message: "Ocurrió un error" });
    }
  });

export default CartRouter