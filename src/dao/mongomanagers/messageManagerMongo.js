import messageModel from "../models/messages.model.js"

// Clase que gestiona los mensajes
export default class MessagesManager {

    // Método para obtener todos los mensajes
    getMessages = async () => {
        try {
            // Consulta la base de datos para obtener todos los mensajes y los convierte a objetos JavaScript
            return await messageModel.find().lean().exec();
        } catch (error) {
            // En caso de error, devuelve el error
            return error;
        }
    }

    // Método para crear un nuevo mensaje
    createMessage = async (message) => {
        try {
            // Crea un nuevo mensaje en la base de datos
            return await messageModel.create(message);
        } catch (error) {
            // En caso de error, devuelve el error
            return error;
        }
    }
}