import OllamaManager from "../services/ollamaManager.js";
import { consolidar_data } from "../utils/helpers.js";

export function createOllamaControllersManager(model) {
    const ollama = new OllamaManager(model);
    async function handle_generos(req, res) {
        try {
            const { entrada } = req.body;

            // Validación
            if (!entrada) {
                return res.status(400).json({
                    error: 'La propiedad "entrada" es obligatoria en el body de la petición.',
                });
            }

            let data = consolidar_data(await ollama.generos(entrada))
            res.status(200).json({
                data: data[0],
                payload: data[1],
                cantidad: data[2],
                status: "ok",
                model:model
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async function handle_tpricipales(req, res) {
        try {
            const { entrada } = req.body;

            // Validación
            if (!entrada) {
                return res.status(400).json({
                    error: 'La propiedad "entrada" es obligatoria en el body de la petición.',
                });
            }

            let data = consolidar_data(await ollama.tprincipales(entrada))
            res.status(200).json({
                data: data[0],
                payload: data[1],
                cantidad: data[2],
                status: "ok",
                model:model
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async function handle_autores(req, res) {
        try {
            const { entrada } = req.body;

            // Validación
            if (!entrada) {
                return res.status(400).json({
                    error: 'La propiedad "entrada" es obligatoria en el body de la petición.',
                });
            }

            let data = consolidar_data(await ollama.autores(entrada))
            res.status(200).json({
                data: data[0],
                payload: data[1],
                cantidad: data[2],
                status: "ok",
                model:model
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async function handle_lprevias(req, res) {
        try {
            const { entrada } = req.body;

            // Validación
            if (!entrada) {
                return res.status(400).json({
                    error: 'La propiedad "entrada" es obligatoria en el body de la petición.',
                });
            }

            let data = consolidar_data(await ollama.lprevias(entrada))
            res.status(200).json({
                data: data[0],
                payload: data[1],
                cantidad: data[2],
                status: "ok",
                model:model
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async function handle_cantidad(req, res) {
        try {
            const { entrada } = req.body;

            // Validación
            if (!entrada) {
                return res.status(400).json({
                    error: 'La propiedad "entrada" es obligatoria en el body de la petición.',
                });
            }

            let data = consolidar_data(await ollama.cantidad(entrada))
            res.status(200).json({
                data: data[0],
                payload: data[1],
                cantidad: data[2],
                status: "ok",
                model:model
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    async function handle_ambientacion(req, res) {
        try {
            const { entrada } = req.body;

            // Validación
            if (!entrada) {
                return res.status(400).json({
                    error: 'La propiedad "entrada" es obligatoria en el body de la petición.',
                });
            }

            let data = consolidar_data(await ollama.ambientacion(entrada))
            res.status(200).json({
                data: data[0],
                payload: data[1],
                cantidad: data[2],
                status: "ok",
                model:model
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    return {
        handle_generos,
        handle_tpricipales,
        handle_autores,
        handle_lprevias,
        handle_cantidad,
        handle_ambientacion,
    };
}





