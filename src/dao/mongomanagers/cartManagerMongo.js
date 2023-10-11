import { cartModel } from "../models/carts.model.js";
import ProductManager from "../mongomanagers/productManagerMongo.js";

// Crear una instancia de ProductManager
const pm = new ProductManager();

// Clase que gestiona los carritos
class CartManager {

    // Método para obtener todos los carritos
    getCarts = async () => {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    };

    // Método para obtener un carrito por su ID
    getCartById = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            return cart;
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return err;
        }
    };

    // Método para agregar un carrito con productos
    addCart = async (products) => {
        try {
            let cartData = {};
            if (products && products.length > 0) {
                cartData.products = products;
            }

            const cart = await cartModel.create(cartData);
            return cart;
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;
        }
    };

    // Método para agregar un producto a un carrito existente
    addProductInCart = async (cid, obj) => {
        try {
            const filter = { _id: cid, "products._id": obj._id };
            const cart = await cartModel.findById(cid);
            const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

            if (findProduct) {
                const update = { $inc: { "products.$.quantity": obj.quantity } };
                await cartModel.updateOne(filter, update);
            } else {
                const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
                await cartModel.updateOne({ _id: cid }, update);
            }

            return await cartModel.findById(cid);
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err.message);
            return err;
        }
    };
};

export default CartManager;