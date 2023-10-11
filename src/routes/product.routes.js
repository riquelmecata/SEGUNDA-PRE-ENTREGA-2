import { Router } from "express";
import ProductManager from "../dao/mongomanagers/productManagerMongo.js"

const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/products",async(req,res)=>{
    let products= await product.getProducts()
    if(products.length ===0){
      res.json("No hay productos en la tienda")
  
    }
    else{
      res.json({message:"success",products})
    }
  })
  

ProductRouter.get("/products:pid", async (req, res) => {
    let productfind = await product.getProductById(req.params);
    res.json({ status: "success", productfind });
  });

  ProductRouter.post("/products", async (req, res) => {
    let newProduct=req.body
    if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.price ||
        !newProduct.stock ||
        !newProduct.category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos: title, description, code, price, stock, category, thumbnail (opcional).' });
    }

    const newproduct = await product.addProduct(newProduct);
     res.json({ status: "success", newproduct });
  });

 /* ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body
      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.price ||
        !newProduct.stock ||
        !newProduct.category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos: title, description, code, price, stock, category, thumbnail (opcional).' });
    }

    res.send(await product.addProduct(newProduct))
}) */

ProductRouter.put("/products/:pid", async (req, res) => {
    let pid=req.params.id
    let updateProducts=req.body
    let updatedproduct = await product.updateProduct(pid,updateProducts);
     res.json({ status: "success", updatedproduct });
  });

ProductRouter.delete("/:id", async (req, res) => {
    let id=req.params.id
    let deleteproduct = await manager.deleteProduct(id);
     res.json({ status: "success",deleteproduct });
  });

export default ProductRouter