import { Router } from "express";
import {createOllamaControllersManager} from '../controllers/ollama.controller.js'


export function ollamaRoutesManager(model) {
    const router = Router();
    const {
        handle_generos,
        handle_tpricipales,
        handle_autores,
        handle_lprevias,
        handle_cantidad,
        handle_ambientacion, } = createOllamaControllersManager(model)
    //Generos
    router.post('/generos', handle_generos);

    //Temas_principales
    router.post('/tprincipales', handle_tpricipales);

    //Autores
    router.post('/autores', handle_autores);

    //Lecturas_previas
    router.post('/lprevias', handle_lprevias);

    //Cantidad_hojas
    router.post('/cantidad', handle_cantidad);

    //Ambientacion
    router.post('/ambientacion', handle_ambientacion);
    return router

}

