import { Router } from 'express';
import CartManager from '../dao/mongomanagers/cartManagerMongo.js';

export const carts = new CartManager()
const CartRouter = Router();

CartRouter.post("/", async (req, res) => {
    const { products } = req.body
    try {
        let cart= await carts.createCart(products)
        
        res.status(200).json({ result: cart })
    } catch (e) {
        res.status(500).json({ err: e })
    }
})

CartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params
    if (cid) {

        try {
            let arrProduct = await carts.getCartById(cid)
            res.status(200).json({status:"success", payload: arrProduct })
        } catch (e) {
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid is empty" })
})

CartRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params
    const { products } = req.body

    if (cid && products) {
        try {
            let result = await carts.updateCartByArr(cid, products)
            res.status(200).json({ status:"success",payload: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({  status:"error",errr: e })
        }
    } else res.status(400).json({  status:"error",err: "Cid and Array must be provided" })
})

CartRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params
    if (cid) {

        try {
            let arrProduct = await carts.cartCleaner(cid)
            res.status(200).json({status:"success", payload: arrProduct })
        } catch (e) {
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid is empty" })
})

CartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params

    if (cid && pid) {

        try {
    
            let result = await carts.updateCart(cid, pid)

            res.status(200).json({ result: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })

})

CartRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params

    if (cid && pid) {
        try {
            let result = await carts.deleteProductCart(cid, pid)
            res.status(200).json({ result: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })
})

CartRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params

    if (cid && pid) {
        try {
            let result = await carts.updatePidQty(cid, pid)
            res.status(200).json({ status:"success", payload: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })
})

export default CartRouter