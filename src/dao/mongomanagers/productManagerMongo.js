import { productsModel } from "../models/products.model.js";

// Clase que gestiona los productos
export default class ProductManager {

    // Método para obtener todos los productos
    getProducts = async () => {
        try {
            // Consulta la base de datos para obtener todos los productos y los convierte a objetos JavaScript
            return await productsModel.find().lean();
        } catch (err) {
            // En caso de error, devuelve el error
            return err;
        }
    }

    // Método para obtener un producto por su ID
    getProductById = async (id) => {
        try {
            // Consulta la base de datos para obtener un producto por su ID
            return await productsModel.findById(id);
        } catch (err) {
            // En caso de error, devuelve un objeto con un mensaje de error
            return { error: err.message };
        }
    }

    // Método para agregar un nuevo producto
    addProduct = async (product) => {
        try {
            // Crea un nuevo producto en la base de datos y luego lo busca para obtener el producto creado
            await productsModel.create(product);
            return await productsModel.findOne({ title: product.title });
        } catch (err) {
            // En caso de error, devuelve el error
            return err;
        }
    }

    // Método para actualizar un producto por su ID
    updateProduct = async (id, product) => {
        try {
            // Actualiza un producto en la base de datos por su ID
            return await productsModel.findByIdAndUpdate(id, { $set: product });
        } catch (err) {
            // En caso de error, devuelve el error
            return err;
        }
    }

    // Método para eliminar un producto por su ID
    deleteProduct = async (id) => {
        try {
            // Elimina un producto en la base de datos por su ID
            return await productsModel.findByIdAndDelete(id);
        } catch (err) {
            // En caso de error, devuelve el error
            return err;
        }
    }
}