class OllamaManager{
    constructor(model){
        this.baseURL = process.env.HOST_OLLAMA;
        this.model = model;
        this.stream = false;
        this.raw = true;
        this.formats = {
            generos: {
                "type": "object",
                "properties": {
                    "generos": { "type": "array" },
                },
                "required": ["generos"]
            },
            temas_principales: {
                "type": "object",
                "properties": {
                    "temas_principales": { "type": "array" }
                },
                "required": ["temas_principales"]
            },
            autores: {
                "type": "object",
                "properties": {
                    "autores": { "type": "array" }
                },
                "required": ["autores"]
            },
            lecturas_previas: {
                "type": "object",
                "properties": {
                    "lecturas_previas": { "type": "array" }
                },
                "required": ["lecturas_previas"]
            },
            cantidad_hojas: {
                "type": "object",
                "properties": {
                    "cantidad_hojas": { "type": "array" }
                },
                "required": ["cantidad_hojas"]
            },
            ambientacion: {
                "type": "object",
                "properties": {
                    "ambientacion": { "type": "array" }
                },
                "required": ["ambientacion"]
            }
        };
    }

    async peticion(entrada,pregunta,formato){
        if (!entrada || !pregunta || !formato) {
            throw new Error('Los parámetros entrada, pregunta y formato son obligatorios.');
        }
        const requestBody ={
            model:this.model,
            stream:this.stream,
            prompt: `
            Evalúa únicamente el siguiente texto: "${entrada}". 
            Responde estrictamente a la pregunta con los datos del texto: "${pregunta}". 
            Si no encuentras una respuesta directa en el texto, devuelve un array vacío no se necesita ingresar ninguna explicación.
            Responde estrictamente en el formato JSON y sin agregar propiedades`,
            format: formato,
        }

        try {
            const response = await fetch(`${this.baseURL}/api/generate`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            if(!response.ok){
                throw new Error(`Error en la solicitud de petición: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data.response;
            
        } catch (error) {
            console.error('Error al comunicarse con Ollama usando fetch:', error.message);
        }
    }
    async generos(entrada){
        try {
            return await this.peticion(entrada, "¿Se pide o recomienda un género de libro?", this.formats.generos);
        } catch (error) {
            throw new Error('Hubo un error en la petición Generos');
        }
    }
    async tprincipales(entrada){
        try {
            return await this.peticion(entrada, "¿Se pide o recomienda un tema o temas que le gustaría para el libro?", this.formats.temas_principales);
        } catch (error) {
            throw new Error('Hubo un error en la petición Temas_principales');
        }
    }
    async autores(entrada){
        try {
            return await this.peticion(entrada, "¿Se pide o recomienda algún autor de algun libro?", this.formats.autores);
        } catch (error) {
            throw new Error('Hubo un error en la petición Autores');
        }
    }
    async lprevias(entrada){
        try {
            return await this.peticion(entrada, "¿Se habla de algún libro?", this.formats.lecturas_previas);
        } catch (error) {
            throw new Error('Hubo un error en la petición Lecturas_previas');
        }
    }
    async cantidad(entrada){
        try {
            return await this.peticion(entrada, "¿Se pide o recomienda una cantidad de hojas para el libro?", this.formats.cantidad_hojas);
        } catch (error) {
            throw new Error('Hubo un error en la petición Cantidad_hojas');
        }
    }
    async ambientacion(entrada){
        try {
            return await this.peticion(entrada, "¿Se habla , pide o recomienda alguna ambientación para la historia del libro?", this.formats.ambientacion);
        } catch (error) {
            throw new Error('Hubo un error en la petición Ambientacion');
        }
    }
    async saludar(W){
        console.log("Funcion Saludar")
        return({"genero":"Hola"})
    }
}
export default OllamaManager;
