import { Router } from "express";
import ProductManager from "../dao/mongomanagers/productManagerMongo.js"
import __dirname from "../utils.js";

const pmanager=new ProductManager()

const router=Router()

router.get("/",async(req,res)=>{
  const listaproductos=await pmanager.getProducts({})
  res.render("home",{listaproductos})
})

router.get("/realtimeproducts",async(req,res)=>{
   res.render("realTimeProducts")
})

router.get("/chat",(req,res)=>{
  res.render("chat")
})

export default router